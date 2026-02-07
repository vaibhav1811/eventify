from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Eventify Cards"
    MONGODB_URL: str
    CORS_ORIGINS: List[str] = ["*"]
    CLOUDINARY_URL: str = ""
    SECRET_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore"
    )

settings = Settings()
