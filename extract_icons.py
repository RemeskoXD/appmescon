import json

try:
    with open('node_modules/simple-icons/data/simple-icons.json', 'r') as f:
        data = json.load(f)
    
    icons = []
    if isinstance(data, list):
        icons = data
    elif isinstance(data, dict) and 'icons' in data:
        icons = data['icons']
        
    if len(icons) > 0:
        print(f"Keys: {icons[0].keys()}")
        
except Exception as e:
    print(f"Error: {e}")
