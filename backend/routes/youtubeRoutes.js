import express from "express";

const router = express.Router();

router.get("/latest", async (req, res) => {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

    /* Step 1: Fetch latest uploads (newest first) */
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=15&order=date&type=video&key=${API_KEY}`
    );
    const searchData = await searchRes.json();

    if (!searchData.items?.length) {
      return res.json([]);
    }

    const ids = searchData.items.map(item => item.id.videoId).join(",");

    /* Step 2: Fetch full video details */
    const detailsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${ids}&key=${API_KEY}`
    );
    const detailsData = await detailsRes.json();

    /* Step 3: HARD FILTER – REAL VIDEOS ONLY */
    const videos = detailsData.items
      .filter(v => {
        /* ❌ Remove live streams */
        if (v.snippet.liveBroadcastContent !== "none") return false;

        /* ❌ Remove Shorts by duration (>= 90s only) */
        const d = v.contentDetails.duration;
        const h = parseInt(d.match(/(\d+)H/)?.[1] || 0);
        const m = parseInt(d.match(/(\d+)M/)?.[1] || 0);
        const s = parseInt(d.match(/(\d+)S/)?.[1] || 0);
        const totalSeconds = h * 3600 + m * 60 + s;

        if (totalSeconds < 90) return false;

        /* ❌ Remove Shorts by keywords */
        const text = (
          v.snippet.title + " " + (v.snippet.description || "")
        ).toLowerCase();

        if (
          text.includes("#short") ||
          text.includes("shorts") ||
          text.includes("ytshorts")
        ) {
          return false;
        }

        /* ❌ Remove vertical / near-square videos */
        const thumb =
          v.snippet.thumbnails?.maxres ||
          v.snippet.thumbnails?.standard ||
          v.snippet.thumbnails?.high;

        if (!thumb) return false;
        if (thumb.height >= thumb.width) return false;

        return true;
      })
      .sort(
        (a, b) =>
          new Date(b.snippet.publishedAt) -
          new Date(a.snippet.publishedAt)
      )
      .slice(0, 3) // ✅ ONLY latest 3 real videos
      .map(v => ({
        id: v.id,
        title: v.snippet.title,
        publishedAt: v.snippet.publishedAt,
        thumbnail:
          v.snippet.thumbnails.maxres?.url ||
          v.snippet.thumbnails.standard?.url ||
          v.snippet.thumbnails.high.url,
      }));

    res.json(videos);
  } catch (err) {
    console.error("YouTube API error:", err);
    res.status(500).json({ message: "Failed to fetch videos" });
  }
});

export default router;
