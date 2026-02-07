from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Eventify Cards"
    MONGODB_URL: str
    CORS_ORIGINS: List[str] = ["*"]
    CLOUDINARY_URL: str = ""
    SECRET_KEY: str = ""

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
