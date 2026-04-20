from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()

model = joblib.load("intent_model.joblib")

class Request(BaseModel):
    text: str

@app.get("/")
def root():
    return {"message": "Backend virker"}

@app.post("/predict")
def predict(req: Request):
    text = req.text.strip()

    prediction = model.predict([text])[0]

    return {
        "intent": str(prediction),
        "text": text
    }