import pandas as pd
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from io import StringIO
from fastapi import Query

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_URL = "https://questionnaire-148920.appspot.com/swe/data.html"

def fetch_and_clean_data():
    try:
        response = requests.get(DATA_URL)
        response.raise_for_status()
        
        html_data = StringIO(response.text)

        tables = pd.read_html(html_data)
        if not tables:
            return pd.DataFrame()
            
        df = tables[0]

        df['Salary'] = (
            df['Salary']
            .astype(str)
            .str.replace(r'[$,]', '', regex=True)
            .str.strip()
        )
        df['Salary'] = pd.to_numeric(df['Salary'], errors='coerce')
        
        return df
    except Exception as e:
        print(f"Error fetching data: {e}")
        return pd.DataFrame()
    
df = fetch_and_clean_data()

"""
Global variable is used for the data frame so that mean, distribution, and median
statistics can refer to the same dataset for reference
"""

@app.get("/salaries/stats")
def get_stats(player_amount: int = Query(default=125)):
    
    top_df = df.nlargest(player_amount, 'Salary')
    
    avg_val = top_df['Salary'].mean()
    median_value = top_df['Salary'].median()
    top_players_json = top_df.replace({pd.NA: None, float('nan'): None}).to_dict(orient="records")
    
    return {
        "stats_for_top_n": player_amount,
        "average": None if pd.isna(avg_val) else avg_val,
        "median": None if pd.isna(median_value) else median_value,
        "top_players_included": top_players_json
    }
    
@app.get("/salaries/mean")
def get_mean_salary(player_amount: int = Query(default=125)):
    global df
    df = fetch_and_clean_data()

    top_df = df.nlargest(player_amount, 'Salary')
    
    avg_val = top_df['Salary'].mean()

    top_players_json = top_df.replace({pd.NA: None, float('nan'): None}).to_dict(orient="records")

    return {
        "stats_for_top_n": player_amount,
        "average": None if pd.isna(avg_val) else avg_val,
        "top_players_included": top_players_json
    }


@app.get("/salaries/median")
def get_median_salary(player_amount: int = Query(default=125)):

    top_df = df.nlargest(player_amount, 'Salary')
    
    median_value = top_df['Salary'].median()

    # convert NaN values to None for valid JSON response
    top_players_json = top_df.replace({pd.NA: None, float('nan'): None}).to_dict(orient="records")

    return {
        "stats_for_top_n": player_amount,
        "median": None if pd.isna(median_value) else median_value,
        "top_players_included": top_players_json
    }

@app.get("/salaries/refresh-median")
def refresh_median(player_amount: int = Query(default=125,)):
    global df
    
    df = fetch_and_clean_data()
    
    top_df = df.nlargest(player_amount, 'Salary')
    
    median_value = top_df['Salary'].median()

    # convert NaN values to None for valid JSON response
    top_players_json = top_df.replace({pd.NA: None, float('nan'): None}).to_dict(orient="records")

    return {
        "stats_for_top_n": player_amount,
        "median": None if pd.isna(median_value) else median_value,
        "top_players_included": top_players_json
    }

@app.get("/salaries/refresh-mean")
def refresh_mean(player_amount: int = Query(default=125)):
    global df
    df = fetch_and_clean_data()
    
    top_df = df.nlargest(player_amount, 'Salary')
    
    avg_val = top_df['Salary'].mean()

    # convert NaN values to None for valid JSON response
    top_players_json = top_df.replace({pd.NA: None, float('nan'): None}).to_dict(orient="records")

    return {
        "stats_for_top_n": player_amount,
        "average": None if pd.isna(avg_val) else avg_val,
        "top_players_included": top_players_json
    }