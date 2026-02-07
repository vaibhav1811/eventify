from pydantic import BaseModel, Field, EmailStr, BeforeValidator
from typing import Optional, Annotated
from datetime import datetime
from enum import Enum

PyObjectId = Annotated[str, BeforeValidator(str)]

class RSVPStatus(str, Enum):
    YES = "yes"
    NO = "no"
    MAYBE = "maybe"

class RSVPBase(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    status: RSVPStatus
    message: Optional[str] = None

class RSVPCreate(RSVPBase):
    pass

class RSVPDB(RSVPBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    event_id: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
