import { useEffect, useState } from "react";
import type { Goal } from "./types/goal";
import {
  fetchGoals,
  createGoal,
  toggleGoal,
  deleteGoal,
} from "./api/goals";

function App() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [title, setTitle] = useState("");

  const loadGoals = async () => {
    const data = await fetchGoals();
    console.log(data, 'vvvvvvvvvvv');

    setGoals(data);
  };

  useEffect(() => {
    console.log('vvvvvvvvvvv');
    loadGoals();
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) return;
    await createGoal(title);
    setTitle("");
    loadGoals();
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 500 }}>
      <h2>🎯 Goals</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New goal..."
      />

      <button onClick={handleCreate}>Add</button>

      <ul>
        {goals.map((goal) => (
          <li key={goal._id}>
            <input
              type="checkbox"
              checked={goal.is_completed}
              onChange={() => toggleGoal(goal).then(loadGoals)}
            />

            <span
              style={{
                textDecoration: goal.is_completed
                  ? "line-through"
                  : "none",
              }}
            >
              {goal.title}
            </span>

            <button onClick={() => deleteGoal(goal._id).then(loadGoals)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
