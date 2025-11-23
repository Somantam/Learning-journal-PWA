import json
import datetime

def save_reflection():
    text = input("Enter your reflection: ")
    
    reflection = {
        "date": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "text": text
    }
    
    try:
        with open('reflections.json', 'r') as f:
            reflections = json.load(f)
    except:
        reflections = []
    
    reflections.append(reflection)
    
    with open('reflections.json', 'w') as f:
        json.dump(reflections, f, indent=2)
    
    print(f"Saved! Total: {len(reflections)}")

if __name__ == "__main__":
    save_reflection()