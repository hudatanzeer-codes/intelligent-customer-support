import os
from dotenv import load_dotenv

load_dotenv()

secret = os.getenv("SECRET_KEY")

if secret:
    print("SECRET_KEY loaded successfully!")
else:
    print("SECRET_KEY not found!")