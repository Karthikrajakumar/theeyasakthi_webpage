import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GlobalLoader from "./GlobalLoader";

export default function RouteChangeLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => setLoading(false), 600);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return loading ? <GlobalLoader /> : null;
}
