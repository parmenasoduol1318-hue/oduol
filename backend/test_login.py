from app.database import SessionLocal
from app.models.user import User
from app.core.security import verify_password

db = SessionLocal()

user = db.query(User).filter(
    User.email == "parmenasoduol1318@gmail.com"
).first()

print("User exists:", user is not None)

print("Hash:")
print(user.hashed_password)

print("Verify Oduol@1318:")
print(verify_password("Oduol@1318", user.hashed_password))