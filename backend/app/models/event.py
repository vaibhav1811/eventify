from pydantic import BaseModel, Field, BeforeValidator
from typing import Optional, List, Annotated
from datetime import datetime

PyObjectId = Annotated[str, BeforeValidator(str)]

class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    date_time: datetime
    location_name: str
    location_coordinates: Optional[dict] = None
    images: List[str] = []
    theme: Optional[str] = None
    custom_message: Optional[str] = None
    itinerary: Optional[List[dict]] = None

class EventCreate(EventBase):
    pass

class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date_time: Optional[datetime] = None
    location_name: Optional[str] = None
    location_coordinates: Optional[dict] = None
    images: Optional[List[str]] = None
    theme: Optional[str] = None
    custom_message: Optional[str] = None
    itinerary: Optional[List[dict]] = None

class EventDB(EventBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    slug: str
    edit_token: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: Optional[datetime] = None

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}
