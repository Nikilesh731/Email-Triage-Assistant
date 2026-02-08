🚀 AI-Powered Email Triage Assistant

An intelligent, professional Email Triage Assistant built using rule-based Natural Language Processing (NLP). This application analyzes raw emails to extract intent, urgency, priority, and actionable insights, helping users efficiently manage high-volume inboxes — all without external APIs or paid services.

✨ Key Features
🎯 Core Functionality

Smart email content analysis (subject + body)

Topic detection (deadlines, meetings, updates, promotions, etc.)

Sender intent identification (request, follow-up, information sharing)

Automatic email categorization:

Important

Information

Follow-up

Spam

Priority assignment:

High

Medium

Low

Context-aware suggested replies

Local history tracking of analyzed emails

📊 Email Intelligence & Analytics

Priority inference using urgency indicators

Timeline & deadline extraction

Action-required detection

Email intent clarity (“what the email is about”)

Real-time analysis results

Insights dashboard with:

Total emails analyzed

Category-wise breakdown

Priority-wise distribution

Recent email activity log

📈 Visual Insights

Email category counters

Priority badges (color-coded)

Timestamped analysis history

Clean dashboard layout for quick decision-making

🎨 Professional UI Features

Clean, minimal interface

Responsive design (desktop & mobile)

Badge-based visual priority indicators

Tab navigation (Home & Insights)

Smooth user experience with instant feedback

Clear history option for data reset

🧠 Smart NLP Logic

Keyword-based topic detection

Rule-based intent classification

Regex-based timeline extraction

Urgency inference using trigger words

Template-based reply generation

Fully offline processing (no API key required)

🛠️ Technology Stack

Frontend

React

Vite

HTML5, CSS3

JavaScript

Backend

Node.js

Express.js

NLP

Rule-based Natural Language Processing

Regex & keyword pattern matching

Storage

Browser localStorage (client-side persistence)

📦 Installation
Prerequisites

Node.js (v14 or higher)

npm package manager

Modern web browser

Setup Steps

Clone the repository and navigate to the project folder:

cd email-triage-assistant


Install dependencies:

npm install


Run the application:

npm run dev


Frontend: http://localhost:5173

Backend: http://localhost:5001

🎮 How to Use
Step 1: Paste an Email

Paste a complete email including subject and body into the input area.

Step 2: Analyze

Click Analyze Email to process the content.

Step 3: View Results

Instantly receive:

What the email is about

Sender intent

Timeline or deadline

Category and priority

Suggested professional reply

Step 4: Insights Dashboard

Navigate to Insights to:

Track email statistics

View recent analyses

Clear history if needed

📊 Understanding the Results
Email Analysis Output

Each analysis includes:

Email intent summary

Action requirement

Timeline detection

Category label

Priority level

Auto-generated reply suggestion

Priority Logic

High: Urgent, same-day deadlines

Medium: Upcoming tasks or follow-ups

Low: Informational or promotional emails

🧪 Sample Input
Subject: Urgent – Project Deadline Today

Please submit the final report by today at 5 PM.
This is critical and needs immediate approval.


Expected Output

Category: Important

Priority: High

Timeline: Today

Suggested reply generated


📄 License

This project is developed for educational and internship purposes.
Free to use, modify, and extend.
