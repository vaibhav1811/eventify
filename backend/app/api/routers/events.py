from fastapi import APIRouter, Body, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List
from app.models.event import EventDB, EventCreate, EventUpdate
from app.db.mongodb import db
import uuid

router = APIRouter()

@router.post("/", response_description="Add new event", response_model=EventDB)
async def create_event(event: EventCreate = Body(...)):
    event_data = jsonable_encoder(event)
    
    # Generate a URL-friendly slug (simplified for now) or use ID
    # For now, let's just use the ID as reference, but the model has 'slug'.
    # We should probably generate a slug.
    slug = str(uuid.uuid4())[:8] # Simple random slug
    
    event_full = {
        **event_data,
        "slug": slug,
        "edit_token": str(uuid.uuid4()), # Token to edit the event later
        "expires_at": event.date_time, # For now, expire at event time, or maybe + 30 days
        # created_at and id will be handled by DB or model defaults
    }
    
    # Assuming 'events' collection
    new_event = await db.client.eventify.events.insert_one(event_full)
    created_event = await db.client.eventify.events.find_one({"_id": new_event.inserted_id})
    return created_event

@router.get("/", response_description="List all events", response_model=List[EventDB])
async def list_events(limit: int = 10):
    events = await db.client.eventify.events.find().to_list(limit)
    return events

@router.get("/{slug}", response_description="Get a single event", response_model=EventDB)
async def show_event(slug: str):
    if (event := await db.client.eventify.events.find_one({"slug": slug})) is not None:
        return event
    
    # Fallback to check by ID if slug not found (optional, but requested in finding)
    # if (event := await db.client.eventify.events.find_one({"_id": slug})) is not None:
    #     return event
        
    raise HTTPException(status_code=404, detail=f"Event {slug} not found")
