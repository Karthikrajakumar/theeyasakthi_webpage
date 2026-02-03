
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

const generateFingerprint = () => {
  return btoa(
    navigator.userAgent +
    window.screen.width +
    window.screen.height +
    Intl.DateTimeFormat().resolvedOptions().timeZone +
    navigator.language
  );
};

let visitorLock = false;

export const trackVisitor = async () => {
  if (visitorLock) return;
  visitorLock = true;

  try {
    const fingerprint = generateFingerprint();

    const q = query(
      collection(db, "visitors"),
      where("fingerprint", "==", fingerprint)
    );

    const snap = await getDocs(q);

    if (snap.empty) {
      await addDoc(collection(db, "visitors"), {
        fingerprint,
        createdAt: new Date(),
      });
    }

  } catch (err) {
    console.error(err);
  }
};
