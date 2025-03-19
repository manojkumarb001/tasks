import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://172.16.4.27:4000/user/view/EMP004");
        const data = await response.json();

        if (data.statuscode === 200) {
          setUserData(data.data);
        } else {
          setError("Error fetching user details");
        }
      } catch (err) {
        setError("Failed to fetch user details");
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="dashboard-container">
      <header>
        <h1 style={{ color: "white" }}>Dashboard</h1>
      </header>

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : userData ? (
        <div style={{ color: "white" }}>
          <h2>Welcome, {userData.Name}!</h2>
          <p>Designation: {userData.designation}</p>
          <p>Reporting Manager: {userData["Reporting Manager"]}</p>
          <p>Location: {userData.location}</p>
        </div>
      ) : (
        <p style={{ color: "white" }}>Loading user details...</p>
      )}

      <button onClick={() => navigate("/")}>Logout</button>
    </div>
  );
}
