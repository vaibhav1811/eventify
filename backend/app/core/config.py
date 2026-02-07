from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGODB_URL: str
    DATABASE_NAME: str = "eventify"
    CLOUDINARY_URL: str = ""
    SECRET_KEY: str = "secret"

    class Config:
        env_file = ".env"

settings = Settings()
