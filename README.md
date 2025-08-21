# Project Setup Guide

## Follow the steps below to run the project locally.

## Frontend Setups

1. Download and unzip the project code.
2. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will be running at **[http://localhost:5173](http://localhost:5173)**.

---

## Backend Setup

1. Open a new terminal window.
2. Navigate to the backend folder:
   ```bash
   cd backend
   ```
3. Install required Python dependencies:
   ```bash
   pip install fastapi pydantic uvicorn
   ```
4. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will be running at **[http://localhost:8000](http://localhost:8000)** or  
   **[http://127.0.0.1:8000](http://127.0.0.1:8000)**.  
   Visiting the link should display a **“Backend is running”** message.

---

✅ Both frontend and backend should now be running locally!
