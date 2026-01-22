import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  return (
    <div style={styles.wrapper}>
      <Sidebar />
      <main style={styles.main}>
        <div style={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#f4f6f8",
  },
  main: {
    flex: 1,
    padding: "30px",
  },
  content: {
    maxWidth: "1100px",
    margin: "0 auto",
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  },
};

export default AdminLayout;
