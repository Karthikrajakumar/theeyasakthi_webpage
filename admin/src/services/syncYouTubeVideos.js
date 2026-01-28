import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;

const parseDurationToSeconds = iso => {
    if (!iso) return null;
    const hours = parseInt(iso.match(/(\d+)H/)?.[1] || 0, 10);
    const minutes = parseInt(iso.match(/(\d+)M/)?.[1] || 0, 10);
    const seconds = parseInt(iso.match(/(\d+)S/)?.[1] || 0, 10);
    const total = hours * 3600 + minutes * 60 + seconds;
    return Number.isFinite(total) ? total : null;
};

export async function syncYouTubeVideos() {
    try {
        if (!API_KEY || !CHANNEL_ID) {
            alert("Missing YouTube API key or Channel ID");
            return;
        }

        // 1️⃣ Fetch channel data
        const channelRes = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
        );

        const channelData = await channelRes.json();
        console.log("📺 Channel API response:", channelData);

        if (!channelData.items || channelData.items.length === 0) {
            alert("No channel data found. Check Channel ID.");
            return;
        }

        const uploadsId =
            channelData.items[0].contentDetails?.relatedPlaylists?.uploads;

        if (!uploadsId) {
            alert("Uploads playlist not found for this channel.");
            return;
        }

        // 2️⃣ Fetch latest uploads
        const playlistRes = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=12&key=${API_KEY}`
        );

        const playlistData = await playlistRes.json();
        console.log("🎞 Playlist API response:", playlistData);

        if (!playlistData.items || playlistData.items.length === 0) {
            alert("No videos found in uploads playlist.");
            return;
        }

        const videoIds = playlistData.items
            .map(item => item.snippet?.resourceId?.videoId)
            .filter(Boolean);

        // 3️⃣ Fetch durations to classify shorts vs videos
        const durationLookup = {};
        if (videoIds.length) {
            const detailsRes = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds.join(",")}&key=${API_KEY}`
            );
            const detailsData = await detailsRes.json();

            detailsData.items?.forEach(detail => {
                const seconds = parseDurationToSeconds(detail.contentDetails?.duration);
                durationLookup[detail.id] = seconds;
            });
        }

        // 4️⃣ Save to Firestore with BEST thumbnail quality + type
        for (let i = 0; i < playlistData.items.length; i++) {
            const item = playlistData.items[i];

            const videoId = item.snippet?.resourceId?.videoId;
            if (!videoId) continue;

            const thumbnails = item.snippet.thumbnails;

            // 🔥 Best-quality thumbnail with fallback
            const thumbnail =
                thumbnails.maxres?.url ||
                thumbnails.high?.url ||
                thumbnails.medium?.url ||
                thumbnails.default?.url;

            const durationSeconds = durationLookup[videoId] ?? null;
            const isShort = typeof durationSeconds === "number" && durationSeconds < 90;

            await setDoc(doc(db, "videos", videoId), {
                videoId,
                title: item.snippet.title,
                thumbnail,
                publishedAt: serverTimestamp(),
                order: i,
                durationSeconds,
                isShort,
                type: isShort ? "short" : "video",
            });
        }

        alert("✅ Latest YouTube videos synced successfully!");
    } catch (error) {
        console.error("❌ YouTube sync failed:", error);
        alert("YouTube sync failed. Check console for details.");
    }
}
