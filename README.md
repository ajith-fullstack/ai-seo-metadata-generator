# 🚀 AI SEO Metadata Generator

## 📸 Preview
![AI SEO Metadata Generator UI](./assets/Screenshot.png)

## 🧠 Overview

AI-powered web application that generates SEO metadata from uploaded images using Google Gemini API.

Users can upload an image and instantly get:

* SEO Title
* Meta Description
* Alt Text
* Tags / Keywords
* Category
* Collection Name
* Best Publish Time

---

## 🔥 Features

* 📷 Image upload via browser UI
* 🤖 AI-powered SEO generation using Gemini
* ⚡ Fast backend with Node.js & Express
* 🧾 Structured JSON output
* 🌐 Simple frontend using HTML, CSS, JavaScript

---

## 🏗️ Project Structure

```bash
├── controllers/
│   └── seoController.js
├── routes/
│   └── seoRoutes.js
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── uploads/
├── server.js
├── .env
├── package.json
```

---

## 🛠 Tech Stack

**Frontend**

* HTML
* CSS
* JavaScript (Vanilla)

**Backend**

* Node.js
* Express
* Multer (file upload)

**AI**

* Google Gemini API (`gemini-2.5-flash`)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd ai-seo-metadata-generator
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Create `.env` file

```env
GEMINI_API_KEY=your_api_key_here
PORT=3000
```

---

### 4️⃣ Start the server

```bash
npm run dev
```

or

```bash
node server.js
```

---

### 5️⃣ Open in browser

```bash
http://localhost:3000
```

---

## 🔌 API Endpoint

### POST `/api/seo/generate`

**Form Data:**

* `image` → image file

---

## 🧪 Example Output

```json
{
  "title": "Modern Wooden Chair for Living Room",
  "description": "Enhance your space with this stylish wooden chair...",
  "alt": "wooden chair in modern living room",
  "tags": ["chair", "furniture", "modern"],
  "category": "Furniture",
  "collection": "Living Room Collection",
  "publish_time": "Friday 6 PM IST"
}
```

---

## 🔐 Best Practices Implemented

* Environment variables for API security
* Modular architecture (Controller / Routes / Services)
* Error handling for API failures
* Clean JSON response formatting

---

## 🎯 Use Case

This project demonstrates how AI can be used to generate SEO metadata from images. Users can upload an image and instantly receive structured SEO content including title, description, tags, category, and publish time. This can assist developers and content creators in preparing SEO-friendly data for products or media.

---