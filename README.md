<div align="right">

# צ'אט ניהול המשימות
### *Function Calling + Agent*

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT-412991?style=flat-square&logo=openai&logoColor=white)](https://platform.openai.com/)
[![React](https://img.shields.io/badge/React-Client-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](#)

ניהול משימות בטקסט חופשי — מספרים לצ'אט מה צריך לעשות, וה־**Agent** מבין לבד איזו פעולה להפעיל במערכת (**הוספה / עדכון / מחיקה / שליפה**) ומחזיר תשובה אנושית.

</div>

---

<div align="right">

## 📑 תוכן עניינים

- [מבנה הפרויקט](#-מבנה-הפרויקט)
- [הרצה](#-הרצה)
- [איך זה עובד (זרימת ה-Agent)](#-איך-זה-עובד-זרימת-ה-agent)

---

## 🗂️ מבנה הפרויקט

| קובץ | תפקיד |
|---|---|
| `todo_service.py` | לוגיקת המשימות (ניהול הנתונים במערך) |
| `agent_service.py` | חיבור ומימוש ה־Agent ל־Gemini |
| `main.py` | שרת ה־API שמרכז את הכל ומטפל ב־CORS |
| `.env` | קובץ הגדרות ה־API (לא להעלות לגיט!) |
| `todo-client/` | תיקיית ממשק המשתמש (React) |

---

## 🚀 הרצה

**1. התקנת תלויות**
```bash
pip install -r requirements.txt
```

**2. הגדרת מפתח** — העתק את `.env.example` ל־`.env` ומלא את המפתח
```bash
copy .env.example .env
```

**3. הרצת השרת**
```bash
uvicorn main:app --reload
```

> 📘 **תיעוד אינטראקטיבי (Swagger):** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
> 💬 **צ'אט (בונוס):** לפתוח את `client/index.html` בדפדפן

---

## ⚙️ איך זה עובד (זרימת ה-Agent)

1. הלקוח (Client) שולח בקשת POST, הכוללת שדה `message`, אל נקודת הקצה `/chat`.
2. הפונקציה `agent()` מעבירה את תוכן ההודעה אל מודל השפה (GPT), בצירוף הגדרת JSON המתארת את הפונקציות הזמינות להפעלה (`tools`).
3. המודל מנתח את הבקשה וקובע אילו מהפונקציות רלוונטית להפעלה, יחד עם הפרמטרים הנדרשים לביצועה.
4. המערכת מפעילה בפועל את הפונקציה המתאימה מתוך `todo_service`, בהתאם להחלטת המודל.
5. תוצאת הביצוע מוחזרת אל המודל, אשר מנסח ממנה תשובה ברורה בשפה טבעית עבור המשתמש.
6. התשובה המנוסחת נשלחת בחזרה אל הלקוח כתגובת ה־API.

</div>

---

<div align="center">

נוצר ע"י **רבקי טולידאנו** ✨

</div>
