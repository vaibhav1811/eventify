import pymongo
from pymongo import MongoClient
from app.core.config import settings
import certifi
import sys
import socket
import requests

print(f"Python Version: {sys.version}")
print(f"PyMongo Version: {pymongo.__version__}")

try:
    ip = requests.get('https://api.ipify.org').text
    print(f"Current Public IP: {ip}")
except Exception as e:
    print(f"Could not get IP: {e}")

print(f"Testing connection to: {settings.MONGODB_URL}")

def test_connection(insecure=False):
    print(f"\nTesting with tlsAllowInvalidCertificates={insecure}...")
    try:
        kwargs = {"tlsCAFile": certifi.where()}
        if insecure:
            kwargs["tlsAllowInvalidCertificates"] = True
            
        client = MongoClient(settings.MONGODB_URL, **kwargs)
        # The ismaster command is cheap and does not require auth.
        client.admin.command('ismaster')
        print("SUCCESS: Connected to MongoDB!")
        return True
    except Exception as e:
        print(f"FAILURE: {e}")
        return False


def test_monkeypatch_ssl():
    print("\nTesting with MONKEYPATCHED SSL context (SECLEVEL=1)...")
    original_create_default_context = ssl.create_default_context

    def custom_create_default_context(purpose=ssl.Purpose.SERVER_AUTH, *, cafile=None, capath=None, cadata=None):
        ctx = original_create_default_context(purpose=purpose, cafile=cafile, capath=capath, cadata=cadata)
        try:
            print("  Setting SECLEVEL=1 on SSL Context...")
            ctx.set_ciphers('DEFAULT@SECLEVEL=1')
            ctx.options |= ssl.OP_NO_TLSv1 | ssl.OP_NO_TLSv1_1 
        except Exception as e:
            print(f"  Could not set ciphers: {e}")
        return ctx

    # Apply patch
    ssl.create_default_context = custom_create_default_context
    
    try:
        # We must use certifi because we still want trust, just lower security level for handshake parameters
        client = MongoClient(
            settings.MONGODB_URL,
            tlsCAFile=certifi.where()
        )
        client.admin.command('ismaster')
        print("SUCCESS: Connected with Monkeypatched SSL!")
    except Exception as e:
        print(f"FAILURE with Monkeypatch: {e}")
    finally:
        # Revert patch
        ssl.create_default_context = original_create_default_context

if not test_connection(insecure=False):
    if not test_connection(insecure=True):
        test_monkeypatch_ssl()

