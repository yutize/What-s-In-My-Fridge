# Nutrition & Recipe Finder Web App

This project is a web application that allows users to input their nutritional goals and preferences—such as calories, protein, carbohydrates, fats, and more—to search for recipes that match their profile. The app also includes a fridge inventory system, enabling users to track ingredients they currently have at home. This helps suggest recipes based on available items, reducing food waste and making meal planning easier.

Recipe data is fetched using the Edamam API, ensuring accurate nutritional information and a wide selection of meal options. There is also a AI powered agent via Gemini which allows for users to calculate their needs based on their body weight and height and etc.

---

# Getting Started

1. Make sure you have Node.js installed  
   https://nodejs.org/en/download/

2. Clone the repository  
   This can be done via Terminal or GitHub Desktop

3. Install dependencies  
   Once cloned, run:

   ```npm install```  
   or  
   ```npm i```

---

# Things to Know About the Project

1. The actual source code in the project is located in the  
   ```wimf```
   folder.

   DO NOT add files inside the main folder.

2. Branching workflow  
   - Create all new branches from development  
   - This is our dev environment  
   - After features are completed:
     - Merge and QA testing
     - Move to staging
     - Final merge into prod after QA approval

---

# Technologies Used

This project uses:

- TypeScript: https://www.typescriptlang.org/docs/
- Node.js: https://nodejs.org/docs/latest/api/
- SQLite: https://nodejs.org/docs/latest/api/
- Vercel: https://vercel.com/docs
- Gemini: https://ai.google.dev/gemini-api/docs
- Edamam API: https://developer.edamam.com/edamam-docs-recipe-api?gad_source=1&gad_campaignid=23449580773&gbraid=0AAAAADvEbgYdc_zWAvBlnfCTrG0LTcbQg&gclid=CjwKCAiAybfLBhAjEiwAI0mBBhdzvt_7pZpvFpC2h1hzpK6rDcRvrNrABLn-IBgs3y7ANl0ZL3y20xoCg-oQAvD_BwE
- Cypress (Used for United/Atuomated Testing): https://docs.cypress.io/app/get-started/why-cypress
---

# Features

- Input custom nutritional goals
  - Calories
  - Protein
  - Carbs
  - Fats
- Search for recipes that match nutrition preferences
- View detailed nutrition breakdowns
- Fridge inventory system
  - Track ingredients you own
  - Get recipe suggestions based on available items
- API-powered recipe search (Edamam)

---

# Environment Setup

Ask Yutong about setup

---

# Project Contract

Project documentation can be found here:

https://mailuc-my.sharepoint.com/:w:/r/personal/stephezm_mail_uc_edu/Documents/Senior%20Design%20Contract%20Group%2010%2025-26%20.docx?d=w4eac3d70c6314d5481acca618b9b7c35&csf=1&web=1&e=qzTDzl

---

# License

This project is for educational purposes.
