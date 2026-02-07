import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = task;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, task]);
    }

    setTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>📝 My To-Do List</h1>

        <div style={styles.inputBox}>
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={styles.input}
          />
          <button onClick={addTask} style={styles.addBtn}>
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        <ul style={styles.list}>
          {tasks.map((task, index) => (
            <li key={index} style={styles.task}>
              {task}
              <div>
                <button
                  onClick={() => editTask(index)}
                  style={styles.editBtn}
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  style={styles.deleteBtn}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>

        <footer style={styles.footer}>
          Built with ❤️ using React
        </footer>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif",
  },

  card: {
    background: "#fff",
    width: "360px",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },

  inputBox: {
    display: "flex",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
  },

  addBtn: {
    background: "#667eea",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "20px",
  },

  task: {
    background: "#f4f6ff",
    padding: "10px",
    borderRadius: "6px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    color: "#333",
  },

  editBtn: {
    background: "#ffc107",
    border: "none",
    borderRadius: "6px",
    marginRight: "6px",
    cursor: "pointer",
    padding: "4px 8px",
  },

  deleteBtn: {
    background: "#ff4d4f",
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    padding: "4px 8px",
  },

  footer: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "13px",
    color: "#777",
  },
};

export default App;
