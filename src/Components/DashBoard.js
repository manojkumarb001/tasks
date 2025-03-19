import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Menu Icon
import "./Dashboard.css"; // Import CSS for styling

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const SAMPLE_USER = {
    userID: "EMP004",
    Name: "Manoj",
    designation: "Manager",
    "Reporting Manager": "Mr. LMN",
    location: "Mumbai",
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://172.16.4.27:4000/user/view/EMP004");
        const data = await response.json();

        if (data.statuscode === 200) {
          setUserData(data.data);
        } else {
          throw new Error("Error fetching user details");
        }
      } catch (err) {
        setError("Server unavailable. Using sample data.");
        setUserData(SAMPLE_USER);
      }
    };

    fetchUserDetails();
  }, []);

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
