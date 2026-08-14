import os
import google.generativeai as genai
from dotenv import load_dotenv
from todo_service import get_tasks, add_task, update_task, delete_task

# טעינת המשתנים מקובץ ה-.env
load_dotenv()

# משיכת המפתח מתוך משתני הסביבה
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("לא נמצא מפתח API! ודאי שקיים קובץ .env עם GEMINI_API_KEY")

# הגדרת ה-API Key של Gemini
genai.configure(api_key=api_key)

def agent(query):
    # הגדרת הפונקציות כ-"כלים" (Tools)
    tools = [get_tasks, add_task, update_task, delete_task]

    # יצירת המודל עם הכלים
    model = genai.GenerativeModel(
        model_name='gemini-1.5-flash',
        tools=tools
    )

    # פתיחת צ'אט עם תמיכה אוטומטית בהפעלת פונקציות
    chat = model.start_chat(enable_automatic_function_calling=True)

    # שליחת השאלה וקבלת התשובה הסופית (לאחר הפעלת הפונקציות אם נדרש)
    response = chat.send_message(query)

    return response.text