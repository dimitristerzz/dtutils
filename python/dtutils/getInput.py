import os
import requests
from dotenv import load_dotenv

def find_env():
    for root, dirs, files in os.walk("."):
        if ".env" in files:
            return os.path.join(root, ".env")

    current = os.path.abspath(".")
    while True:
        if ".env" in os.listdir(current):
            return os.path.join(current, ".env")
        parent = os.path.dirname(current)
        if parent == current:
            break
        current = parent
    return None

def getInput(url):
    env_file = find_env()
    load_dotenv(env_file)

    headers = {
        "Cookie": f"session={os.getenv('SC')}",
    }

    return requests.get(url, headers=headers).text