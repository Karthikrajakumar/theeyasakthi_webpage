import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Analytics() {
  const [pages, setPages] = useState([]);
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    const unsubPages = onSnapshot(
      collection(db, "analytics_pages"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          totalTime: doc.data().totalTime || 0,
        }));
        setPages(data);
      }
    );

    const unsubVisitors = onSnapshot(
      collection(db, "visitors"),
      (snapshot) => {
        setVisitors(snapshot.size);
      }
    );

    return () => {
      unsubPages();
      unsubVisitors();
    };
  }, []);

  const formatTime = (seconds) => {
    if (!seconds) return "0m 0s";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Analytics Dashboard</h2>
      <h3>Total Visitors: {visitors}</h3>

      <table border="1" width="100%" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Page</th>
            <th>Time Spent</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{formatTime(p.totalTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}
