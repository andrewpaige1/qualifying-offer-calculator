# Phillies Baseball R&D Questionnaire

## Project Description

This application calculates the monetary value of an MLB qualifying offer, which is defined as the average of the 125 highest salaries from the previous season. The application fetches salary data from a provided source, processes it, and displays the qualifying offer amount along with relevant statistics and visualizations.

## Requirements

- Python 3.8 or higher
- Node.js 18 or higher
- npm
- pip (Python package manager)

## Installation & Setup

### Step 1: Create and Activate Virtual Environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

### Step 2: Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### Step 3: Install Frontend Dependencies

Navigate to the frontend directory:

```bash
cd ../frontend
```

Install npm dependencies:

```bash
npm install
```

## Running the Application

### Step 1: Start the Backend Server

Open a terminal and run:

```bash
cd backend
fastapi dev main.py
```

The backend API will be available at `http://localhost:8000`

### Step 2: Start the Frontend Application

Open a new terminal and run:

```bash
cd frontend
npm run dev
```

The frontend will start and be ready to access.

## Accessing the Application

Once both servers are running, open your browser and navigate to:

```
http://localhost:3000
```

You will see the dashboard displaying:
- The qualifying offer value (average of top 125 player salaries)
- A table of the top 125 highest-paid players
- Key statistics (mean, median, player count)
- Salary distribution visualization
- Navigation to additional views (Distribution, Median)

The application automatically fetches fresh data from the source each time you refresh.
