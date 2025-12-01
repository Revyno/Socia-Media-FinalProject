📸 Galleria - Photo Sharing App

A modern photo sharing application built with React, Vite, Tailwind CSS, and shadcn/ui.

✨ Features

🔐 Authentication - Login & Register

🏠 Home Feed - View posts from all users

🔍 Discover - Explore photos with search & trending tags

📚 Collections - Organize your photos

👤 Profile - User profile with stats & photo grid

❤️ Like System - Like/unlike posts

👥 Follow System - Follow/unfollow users

📱 Responsive Design - Mobile & desktop optimized

🎨 Dark Theme - Modern neutral color palette

🚀 Getting Started
📌 Prerequisites

Node.js v18+

npm or yarn

🛠️ Installation
1️⃣ Clone the Repository
git clone https://github.com/reyvnho/galleria.git
cd galleria

2️⃣ Install Dependencies
✔ Install React + Vite (if starting new project)
npm create vite@latest .
npm install

3️⃣ Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


Add the Tailwind config:

tailwind.config.js

content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]


Add Tailwind to CSS:

src/index.css

@tailwind base;
@tailwind components;
@tailwind utilities;

4️⃣ Install shadcn/ui
Install shadcn CLI:
npx shadcn-ui@latest init


Add components (example):

npx shadcn-ui@latest add button card input

5️⃣ Install Axios
npm install axios

6️⃣ Install Lucide Icons
npm install lucide-react


Example usage:

import { Camera } from "lucide-react";

7️⃣ Install React Router DOM
npm install react-router-dom

8️⃣ Install Common React Dependencies
Zustand (global state)
npm install zustand

React Query (fetching + caching)
npm install @tanstack/react-query

Classnames helper
npm install clsx

Utility merge for Tailwind
npm install tailwind-merge

9️⃣ Run the Project
npm run dev