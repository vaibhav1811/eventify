import urllib.request
import json
import datetime

API_URL = "http://127.0.0.1:8000/api/events"

def test_flow():
    # 1. Create Event
    print("Creating event...")
    data = {
        "title": "Test Event",
        "date_time": datetime.datetime.now().isoformat(),
        "location_name": "Test Location",
        "description": "Test Description"
    }
    
    req = urllib.request.Request(
        f"{API_URL}/", 
        data=json.dumps(data).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            print("Create Response:", json.dumps(result, indent=2))
            slug = result.get('slug')
            if not slug:
                print("ERROR: No slug returned!")
                return
            
            print(f"Got slug: {slug}")
            
            # 2. Get Event
            print(f"Fetching event {slug}...")
            with urllib.request.urlopen(f"{API_URL}/{slug}") as get_response:
                get_result = json.loads(get_response.read().decode('utf-8'))
                print("Get Response:", json.dumps(get_result, indent=2))
                print("SUCCESS: Event fetched.")
                
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code}")
        print(e.read().decode('utf-8'))
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_flow()
