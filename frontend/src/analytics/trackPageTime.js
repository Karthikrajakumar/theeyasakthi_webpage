import { doc, setDoc, increment } from "firebase/firestore";
import { db } from "../firebase/firebase";

let startTime = null;
let currentPage = null;

const sanitizePage = (page) => {
  if (page === "/") return "home";
  return page.replace(/^\//, "").replace(/\//g, "_");
};

export const startTracking = (page) => {
  currentPage = sanitizePage(page);
  startTime = Date.now();
};

export const stopTracking = async () => {
  if (!startTime || !currentPage) return;

  const duration = Math.floor((Date.now() - startTime) / 1000);

  try {
    const ref = doc(db, "analytics_pages", currentPage);

    await setDoc(
      ref,
      { totalTime: increment(duration) },
      { merge: true }
    );
  } catch (err) {
    console.error("Time Tracking Error:", err);
  }

  startTime = null;
  currentPage = null;
};
