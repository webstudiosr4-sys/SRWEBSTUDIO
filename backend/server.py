from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
import uuid
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URL)
db = client["srwebstudio"]
contacts_collection = db["contacts"]

NOTIFY_EMAIL = "webstudiosr4@gmail.com"


class ContactForm(BaseModel):
    name: str
    email: str
    service: Optional[str] = None
    message: str
    consent: Optional[bool] = True


def send_email_notification(data: dict):
    """Send email notification using SMTP. Falls back gracefully if not configured."""
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))

    if not smtp_user or not smtp_pass:
        print("SMTP not configured - skipping email notification. Data saved to DB.")
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Nowe zapytanie od {data['name']} - SR Web Studio"
        msg["From"] = smtp_user
        msg["To"] = NOTIFY_EMAIL

        html = f"""
        <html>
        <body style="font-family: Arial, sans-serif; background: #0a0a0f; color: #f5f5f5; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: #1a1a2e; border-radius: 16px; padding: 30px; border: 1px solid rgba(99,102,241,0.3);">
                <h2 style="color: #818cf8; margin-top: 0;">Nowe zapytanie ze strony</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 10px 0; color: #a1a1aa; border-bottom: 1px solid rgba(255,255,255,0.1);">Imię / Firma:</td>
                        <td style="padding: 10px 0; color: #f5f5f5; border-bottom: 1px solid rgba(255,255,255,0.1); font-weight: bold;">{data['name']}</td></tr>
                    <tr><td style="padding: 10px 0; color: #a1a1aa; border-bottom: 1px solid rgba(255,255,255,0.1);">Email:</td>
                        <td style="padding: 10px 0; color: #f5f5f5; border-bottom: 1px solid rgba(255,255,255,0.1);"><a href="mailto:{data['email']}" style="color: #818cf8;">{data['email']}</a></td></tr>
                    <tr><td style="padding: 10px 0; color: #a1a1aa; border-bottom: 1px solid rgba(255,255,255,0.1);">Usługa:</td>
                        <td style="padding: 10px 0; color: #f5f5f5; border-bottom: 1px solid rgba(255,255,255,0.1);">{data.get('service', 'Nie podano')}</td></tr>
                    <tr><td style="padding: 10px 0; color: #a1a1aa;">Wiadomość:</td>
                        <td style="padding: 10px 0; color: #f5f5f5;">{data['message']}</td></tr>
                </table>
                <p style="color: #52525b; font-size: 12px; margin-top: 20px;">Wysłano: {data.get('created_at', 'N/A')}</p>
            </div>
        </body>
        </html>
        """

        msg.attach(MIMEText(html, "html"))

        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, NOTIFY_EMAIL, msg.as_string())

        print(f"Email notification sent to {NOTIFY_EMAIL}")
        return True
    except Exception as e:
        print(f"Email sending failed: {e}")
        return False


@app.post("/api/contact")
async def submit_contact(form: ContactForm):
    contact_data = {
        "id": str(uuid.uuid4()),
        "name": form.name,
        "email": form.email,
        "service": form.service,
        "message": form.message,
        "consent": form.consent,
        "created_at": datetime.utcnow().isoformat(),
    }

    # Save to MongoDB
    await contacts_collection.insert_one(contact_data)

    # Attempt email notification
    email_sent = send_email_notification(contact_data)

    return {
        "id": contact_data["id"],
        "status": "success",
        "email_sent": email_sent,
        "message": "Wiadomość została wysłana pomyślnie!",
    }


@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.on_event("startup")
async def startup_db_client():
    try:
        await client.admin.command("ping")
        print("Connected to MongoDB")
    except Exception as e:
        print(f"MongoDB connection error: {e}")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
