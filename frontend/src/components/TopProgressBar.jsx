import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function TopProgressBar() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setProgress(20);

    const step1 = setTimeout(() => setProgress(60), 200);
    const step2 = setTimeout(() => setProgress(85), 400);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
    };
  }, [location.pathname]);

  // complete when done rendering
  useEffect(() => {
    if (!visible) return;
    const done = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 200);
    }, 600);

    return () => clearTimeout(done);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "3px",
        width: progress + "%",
        background: "#ff0000",
        transition: "width 0.25s ease",
        zIndex: 99999,
      }}
    />
  );
}
