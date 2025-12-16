import type { Goal } from "../types/goal";

const API_URL = "http://localhost:8000";

export async function fetchGoals(): Promise<Goal[]> {
    const res = await fetch(`${API_URL}/goals`);
    if (!res.ok) throw new Error("Failed to fetch goals");
    return res.json();
}

export async function createGoal(title: string): Promise<Goal> {
    const res = await fetch(`${API_URL}/goals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error("Failed to create goal");
    return res.json();
}

export async function toggleGoal(goal: Goal): Promise<Goal> {
    const res = await fetch(`${API_URL}/goals/${goal._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: goal.title,
            description: goal.description,
            is_completed: !goal.is_completed,
        }),
    });
    if (!res.ok) throw new Error("Failed to update goal");
    return res.json();
}

export async function deleteGoal(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/goals/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete goal");
}
