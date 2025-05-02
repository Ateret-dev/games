Magical Pets – Three.js Demo
============================

איך מריצים?
------------
1. פתחו שרת מקומי (למשל עם `npx serve` או `python -m http.server`) בתיקיית `magical_pets_game`.
2. גשו לכתובת http://localhost:8000 (או הפורט שיוצג).
3. בחרו חיית מחמד (Unicorn / Dragon) ולחצו Feed כדי לפתח אותה בין שלבי Egg → Hatchling → Adult.

איך זה בנוי?
------------
* `index.html` – עמוד HTML בסיסי עם תפריט בחירה וכפתור Feed.
* `main.js` – קוד Three.js שטוען קבצי JSON ומחיל לוגיקה בסיסית.
* `data/*.json` – תיאור כל שלב של החיה בפורמט JSON.

הרחבות אפשריות
---------------
* הוסיפו עוד שלבים ע"י יצירת קבצי JSON נוספים ועדכון המערך `stages` ב־main.js.
* שלבו טקסטורות, סאונד ופיזיקה.
* כתבו לוגיקה מתקדמת (לדוגמה נקודות ניסיון, אויבים, משימות).

2025‑05‑02: Added TEEN stage for Unicorn and Dragon (unicorn_teen.json, dragon_teen.json) and updated main.js.
