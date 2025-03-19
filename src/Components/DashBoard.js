import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Menu Icon
import "./Dashboard.css"; // Import CSS for styling

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const userID = sessionStorage.getItem("userID"); // Get user ID from sessionStorage
    if (!userID) {
      setError("User not logged in. Redirecting to login...");
      setTimeout(() => navigate("/"), 2000); // Redirect to login after 2 seconds
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://172.16.4.27:4000/user/view/${userID}`, {
          method: "GET",
        });

        const data = await response.json();

        if (response.ok && data.statuscode === 200) {
          setUserData(data.data);
        } else {
          throw new Error(data.message || "Error fetching user details");
        }
      } catch (err) {
        setError("Error fetching user details. Please try again.");
        console.error(err); // Log the error for debugging
      }
    };

    fetchUserDetails();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="header">
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars size={25} />
        </div>
        <h1>Dashboard</h1>
        <button className="logout-btn" onClick={() => navigate("/")}>
          Logout
        </button>
      </header>

      {/* Sidebar Menu (Toggles On Click) */}
      {menuOpen && (
        <div className="sidebar">
          <ul>
            <li onClick={() => navigate("/task")}>Task Page</li>
            <li onClick={() => navigate("/assigning")}>Assigning Page</li>
            <li onClick={() => navigate("/status")}>Status Page</li>
          </ul>
        </div>
      )}

      {/* User Info */}
      <div className="user-profile">
        {error && <p className="error">{error}</p>}
        {userData ? (
          <div className="profile-card">
            <h2>Welcome, {userData.Name}!</h2>
            <p><strong>User ID:</strong> {userData.userID}</p>
            <p><strong>Designation:</strong> {userData.designation}</p>
            <p><strong>Reporting Manager:</strong> {userData["Reporting Manager"]}</p>
            <p><strong>Location:</strong> {userData.location}</p>
          </div>
        ) : (
          <p className="loading">Loading user details...</p>
        )}
      </div>

      {/* Dashboard Navigation Cards */}
      <div className="dashboard-boxes">
        <div className="box" onClick={() => navigate("/task")}>Task Page</div>
        <div className="box" onClick={() => navigate("/assigning")}>Assigning Page</div>
        <div className="box" onClick={() => navigate("/status")}>Status Page</div>
      </div>
    </div>
  );
}
