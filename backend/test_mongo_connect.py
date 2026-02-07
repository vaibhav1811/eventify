import sys
import os
import asyncio
import certifi
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

# Ensure backend directory is in python path
sys.path.append(os.getcwd())

async def test_connection(name, **kwargs):
    with open("test_results.log", "a") as f:
        f.write(f"\n--- Testing {name} ---\n")
        f.write(f"Options: {kwargs}\n")
        try:
            client = AsyncIOMotorClient(settings.MONGODB_URL, **kwargs)
            # Force a call to check connection
            await client.admin.command('ping')
            f.write(f"SUCCESS: Connected with {name}!\n")
            print(f"SUCCESS: {name}")
            client.close()
            return True
        except Exception as e:
            f.write(f"FAILED {name}: {e}\n")
            print(f"FAILED: {name}")
            return False

async def main():
    if sys.platform == "win32":
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    
    # 1. Standard Certifi
    await test_connection("Certifi", tls=True, tlsCAFile=certifi.where())

    # 2. System Certs (no CAFile)
    await test_connection("System Certs", tls=True)

    # 3. Insecure (Skip Verification) - FOR DEBUGGING ONLY
    await test_connection("Insecure", tls=True, tlsAllowInvalidCertificates=True)

if __name__ == "__main__":
    asyncio.run(main())
