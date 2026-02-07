<<<<<<< HEAD
=======
# eventify
A website for building your web card, ease up your event invites.

>>>>>>> 4ea7398f64f03c894a363e473db914e9a8c1ff4e
# Eventify Cards

A frictionless, one-page event invitation platform. Create beautiful, temporary event cards in seconds.

## Tech Stack

**Frontend**
-   React (Vite)
-   TypeScript
-   Tailwind CSS + shadcn/ui
-   React Hook Form

**Backend**
-   FastAPI
-   MongoDB (Motor)
-   Cloudinary (Image Upload)

## Project Structure

-   `frontend/`: React application
-   `backend/`: FastAPI application

## Getting Started

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
