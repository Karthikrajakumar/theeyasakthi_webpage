import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? styles.activeLink : {};

  return (
    <aside style={styles.sidebar}>
      <div>
        <h2 style={styles.logo}>Admin Panel</h2>

        <nav style={styles.nav}>
          <Link to="/dashboard" style={{ ...styles.link, ...isActive("/dashboard") }}>Dashboard</Link>
          <Link to="/songs" style={{ ...styles.link, ...isActive("/songs") }}>Songs</Link>
          <Link to="/podcasts" style={{ ...styles.link, ...isActive("/podcasts") }}>Podcasts</Link>
          <Link to="/videos" style={{ ...styles.link, ...isActive("/videos") }}>Videos</Link>
          <Link to="/blogs" style={{ ...styles.link, ...isActive("/blogs") }}>Blogs</Link>
          <Link to="/posts" style={{ ...styles.link, ...isActive("/posts") }}>Posts</Link>
          <Link to="/analytics" style={{ ...styles.link, ...isActive("/analytics") }}>Analytics</Link>
        </nav>
      </div>

      <button onClick={logout} style={styles.logout}>Logout</button>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: "240px",
    background: "#0f172a",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "25px 20px",
  },
  logo: {
    marginBottom: "40px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "600",
    letterSpacing: "0.5px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  link: {
    color: "#cbd5e1",
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: "6px",
    fontSize: "14px",
  },
  activeLink: {
    background: "#1e293b",
    color: "#fff",
  },
  logout: {
    background: "#dc2626",
    border: "none",
    color: "#fff",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Sidebar;
