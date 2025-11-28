from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from passlib.context import CryptContext
import databases
import sqlalchemy

DATABASE_URL = "postgresql://user:password@localhost/devhub"
database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

users = sqlalchemy.Table(
    "users",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("username", sqlalchemy.String, unique=True),
    sqlalchemy.Column("email", sqlalchemy.String, unique=True),
    sqlalchemy.Column("password", sqlalchemy.String),
)

engine = sqlalchemy.create_engine(DATABASE_URL)
metadata.create_all(engine)

app = FastAPI()

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.post("/signup")
async def signup(user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    query = users.insert().values(username=user.username, email=user.email, password=hashed_password)
    try:
        user_id = await database.execute(query)
        return {"id": user_id, "username": user.username}
    except Exception as e:
        raise HTTPException(status_code=400, detail="User already exists")

@app.post("/login")
async def login(user: UserCreate):
    query = users.select().where(users.c.email == user.email)
    db_user = await database.fetch_one(query)
    if db_user and pwd_context.verify(user.password, db_user["password"]):
        return {"message": "Login successful", "username": db_user["username"]}
    raise HTTPException(status_code=401, detail="Invalid credentials")
