from fastapi import FastAPI
from pydantic import BaseModel
import joblib 
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

# Loading the model and encoder 
model=joblib.load('D:\\Hackathon_works\\yield_api\\models\\xgb_yield_model.pkl')
encoder=joblib.load('D:\\Hackathon_works\\yield_api\\models\\target_encoder.pkl')

app = FastAPI()

class UserInput(BaseModel):
    Soil_Type: str
    Crop: str
    Rainfall_mm: float
    Temperature_Celsius: float
    Fertilizer_Used: bool
    Irrigation_Used: bool
    Weather_Condition: str
    Days_to_Harvest: int

def preprocess_user_input(input_dict):
    df=pd.DataFrame([input_dict])
    df['Fertilizer_Used'] = df['Fertilizer_Used'].astype(int)
    df['Irrigation_Used'] = df['Irrigation_Used'].astype(int)

    expected_cols = ['Soil_Type', 'Crop', 'Rainfall_mm', 'Temperature_Celsius',
                     'Fertilizer_Used', 'Irrigation_Used', 'Weather_Condition',
                     'Days_to_Harvest']
    df = df[expected_cols]
    df_encoded = encoder.transform(df)
    return df_encoded

# Prediction route
@app.post("/predict")
def predict_yield(user_input: UserInput):
    input_dict = user_input.dict()
    X_encoded = preprocess_user_input(input_dict)
    prediction = float(model.predict(X_encoded)[0])
    return {"predicted_yield": round(prediction, 2)}




app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)