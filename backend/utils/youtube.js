import axios from "axios";

export const getYouTubeVideoDetails = async (videoId) => {
  const url = "https://www.googleapis.com/youtube/v3/videos";

  const { data } = await axios.get(url, {
    params: {
      part: "snippet",
      id: videoId,
      key: process.env.YOUTUBE_API_KEY,
    },
  });

  if (!data.items.length) return null;

  return {
    publishedAt: data.items[0].snippet.publishedAt,
  };
};
