from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from fastapi.middleware.cors import CORSMiddleware

from models import Goal

app = FastAPI(title="Goal CRUD with FastAPI + Beanie")



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.on_event("startup")
async def start_db():
    client = AsyncIOMotorClient("mongodb://mongodb:27017")
    print('i am connected')
    await init_beanie(
        database=client.goal_db,
        document_models=[Goal],
    )


# ---------------- CRUD APIs ---------------- #

@app.post("/goals", response_model=Goal)
async def create_goal(goal: Goal):
    await goal.insert()
    return goal


@app.get("/goals", response_model=list[Goal])
async def list_goals():
    return await Goal.find_all().to_list()


@app.get("/goals/{goal_id}", response_model=Goal)
async def get_goal(goal_id: str):
    goal = await Goal.get(goal_id)
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    return goal


@app.put("/goals/{goal_id}", response_model=Goal)
async def update_goal(goal_id: str, data: Goal):
    goal = await Goal.get(goal_id)
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    goal.title = data.title
    goal.description = data.description
    goal.is_completed = data.is_completed

    await goal.save()
    return goal


@app.delete("/goals/{goal_id}")
async def delete_goal(goal_id: str):
    goal = await Goal.get(goal_id)
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    await goal.delete()
    return {"message": "Goal deleted successfully"}
