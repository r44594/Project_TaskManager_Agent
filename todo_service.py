# todo_service.py
tasks = []

def get_tasks(status=None, task_type=None):
    """שליפת משימות עם סינונים (סטטוס או סוג)"""
    filtered = tasks
    if status:
        filtered = [t for t in filtered if t["status"] == status]
    if task_type:
        filtered = [t for t in filtered if t["type"] == task_type]
    return filtered

def add_task(title, description="", task_type="כללי", start_date=None, end_date=None):
    """הוספת משימה עם כל המאפיינים"""
    task = {
        "id": len(tasks) + 1,
        "title": title,
        "description": description,
        "type": task_type,
        "start_date": start_date,
        "end_date": end_date,
        "status": "פתוח"
    }
    tasks.append(task)
    return task

def update_task(task_id: int, **kwargs):
    """עדכון גמיש של כל שדה במשימה לפי קוד (id)"""
    for task in tasks:
        if task["id"] == task_id:
            task.update(kwargs)
            return task
    return {"error": "משימה לא נמצאה"}

def delete_task(task_id: int):
    """מחיקת משימה לפי קוד"""
    global tasks
    tasks = [t for t in tasks if t["id"] != task_id]
    return {"message": f"משימה {task_id} נמחקה"}