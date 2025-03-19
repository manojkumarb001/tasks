import React, { useState } from "react";
import "./Task.css";

const Task = () => {
  const [expandedTask, setExpandedTask] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState({});

  const tasks = [
    {
      id: 1,
      title: "Build Login System",
      description: "Create a secure user authentication flow.",
      assignedBy: "Alice",
      deadline: "March 30, 2025",
      teamMembers: ["John", "Mike", "Sophie"],
    },
    {
      id: 2,
      title: "Optimize Database",
      description: "Enhance DB queries for faster performance.",
      assignedBy: "Bob",
      deadline: "April 15, 2025",
      teamMembers: ["Sara", "Eli", "Lucas"],
    },
    {
      id: 3,
      title: "UI Redesign",
      description: "Revamp the landing page layout.",
      assignedBy: "Charlie",
      deadline: "April 5, 2025",
      teamMembers: ["Nina", "Sam", "Leo"],
    },
    {
      id: 4,
      title: "API Integration",
      description: "Connect front-end with backend services.",
      assignedBy: "Diana",
      deadline: "April 25, 2025",
      teamMembers: ["Liam", "Noah", "Emma"],
    },
  ];

  const toggleExpand = (id) => {
    setExpandedTask(expandedTask === id ? null : id);
  };

  const handleFileChange = (taskId, e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles((prev) => ({
        ...prev,
        [taskId]: file.name,
      }));
    }
  };

  return (
    <div className="task-container">
      <h1 className="task-header" style={{color:"white"}}>Task Manager</h1>
      <div className="task-grid">
        {tasks.map((task) => (
          <div key={task.id} className={`task-box ${expandedTask === task.id ? "expanded" : ""}`}>
            <div onClick={() => toggleExpand(task.id)} className="task-title">
              <h2>{task.title}</h2>
              <p>{task.description}</p>
            </div>

            {expandedTask === task.id && (
              <div className="task-details">
                <p><strong>Assigned By:</strong> {task.assignedBy}</p>
                <p><strong>Deadline:</strong> {task.deadline}</p>
                <p><strong>Team Members:</strong> {task.teamMembers.join(", ")}</p>

                <div className="file-upload">
                  <input type="file" onChange={(e) => handleFileChange(task.id, e)} />
                  {uploadedFiles[task.id] && <p>Uploaded: {uploadedFiles[task.id]}</p>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
