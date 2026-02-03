import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const fetchPages = async () => {
  const snap = await getDocs(collection(db, "analytics_pages"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const fetchVisitors = async () => {
  const snap = await getDocs(collection(db, "visitors"));
  return snap.size;
};
