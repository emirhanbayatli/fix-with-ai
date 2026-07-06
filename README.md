# 🛠️ Fix with AI - Your Smart Repair Assistant



![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js&logoColor=white)

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

![Gemini AI](https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white)



**Fix with AI** is a modern web application that empowers users to repair their broken items themselves. By simply uploading a photo of the issue, the application leverages Google's Gemini 2.5 Flash model to analyze the problem and generate a comprehensive, step-by-step repair guide. 



This project aims to promote sustainability, save money, and help users learn new skills through AI-assisted DIY repairs.



## ✨ Key Features



* **🤖 AI-Powered Analysis:** Upload an image of a broken item, and the Gemini AI instantly diagnoses the problem.

* **📋 Structured Repair Guides:** Receive clear, step-by-step instructions, including difficulty level, estimated time, and a checklist of required materials.

* **🔒 Secure Authentication:** Secure user registration and login using Firebase Auth (Email/Password & Google OAuth).

* **📂 Repair History:** All analyses are saved securely in Cloud Firestore, allowing users to revisit past repair guides at any time.

* **☁️ Cloud Storage:** Images are seamlessly uploaded and stored using Vercel Blob.

* **🛡️ Protected API Routes:** Backend endpoints are secured using Firebase Admin SDK to verify user sessions.

* **📱 Fully Responsive:** A clean, accessible, and mobile-friendly UI built with Tailwind CSS and Shadcn UI.



## 🧰 Tech Stack



* **Frontend:** React, Next.js (App Router), TypeScript

* **Styling:** Tailwind CSS, Radix UI (Shadcn UI components)

* **Backend / API:** Next.js Route Handlers

* **Database & Auth:** Firebase Client SDK & Firebase Admin SDK (Firestore, Auth)

* **AI Integration:** `@google/genai` (Gemini 2.5 Flash)

* **Image Storage:** `@vercel/blob`

* **Form Handling:** React Hook Form



## 🚀 Getting Started


### Prerequisites

Ensure you have the following installed on your local machine:

* [Node.js](https://nodejs.org/) (v18 or higher)

* npm, yarn, or pnpm

* A Firebase Project

* A Google Gemini API Key

* A Vercel account (for Blob storage)



### Installation



1. **Clone the repository:**

   ```bash

   git clone [https://github.com/yourusername/fix-with-ai.git](https://github.com/yourusername/fix-with-ai.git)

   cd fix-with-ai
 

2.  **Install dependencies:**
```
 npm install
 ```


###  🤝 Contributing

Contributions, issues, and feature requests are welcome! 


