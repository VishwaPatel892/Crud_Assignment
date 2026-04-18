# Crud_Assignment



---

## 🌍 Live API (Render)

👉 https://backend-assignment-1-1.onrender.com/


---

## 📮 Postman Documentation

👉 https://documenter.getpostman.com/view/50839289/2sBXqDs3bg

---

## 💻 GitHub Repository

👉 https://github.com/VishwaPatel892/Crud_Assignment

---


### 📌 Objective

This project is a **REST API built using Express.js** that manages notes using **MongoDB with Mongoose**.

The API allows users to:

- Create single and multiple notes  
- Fetch all notes or a specific note  
- Update notes (full & partial)  
- Delete single or multiple notes  

---

## 🚀 Features

- Full CRUD operations  
- Bulk insert & bulk delete  
- RESTful API design  
- MVC architecture  
- MongoDB database integration  
- Proper HTTP status codes  
- Structured JSON responses  

---

## 🛠️ Tech Stack

- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- Postman  

---

## 📂 Project Structure

```
notes-app/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   └── note.model.js
│   │
│   ├── controllers/
│   │   └── note.controller.js
│   │
│   ├── routes/
│   │   └── note.routes.js
│   │
│   ├── middlewares/               ← Create folder, leave empty for now
│   │
│   ├── app.js
│   └── index.js
│
├── .env
├── .env.example
└── package.json
```


## API Endpoints

Base URL: `/api/notes`

| # | Method | Endpoint | Description |
|---|--------|----------|-------------|
| 1 | `POST` | `/api/notes` | Create a single note |
| 2 | `POST` | `/api/notes/bulk` | Create multiple notes at once |
| 3 | `GET` | `/api/notes` | Get all notes |
| 4 | `GET` | `/api/notes/:id` | Get a single note by ID |
| 5 | `PUT` | `/api/notes/:id` | Replace a note completely |
| 6 | `PATCH` | `/api/notes/:id` | Update specific fields only |
| 7 | `DELETE` | `/api/notes/:id` | Delete a single note |
| 8 | `DELETE` | `/api/notes/bulk` | Delete multiple notes by IDs |

---
## Endpoint Details

---

### 1. POST `/api/notes` — Create a note

**Request body:**
```json
{
  "title": "Team standup agenda",
  "content": "Discuss sprint blockers and deployment plan",
  "category": "work",
  "isPinned": true
}
```

**Success response — `201`:**
```json
{
  "success": true,
  "message": "Note created successfully",
  "data": { }
}
```

---

### 2. POST `/api/notes/bulk` — Create multiple notes

**Request body:**
```json
{
  "notes": [
    { "title": "Note one",   "content": "Content one",   "category": "work"     },
    { "title": "Note two",   "content": "Content two",   "category": "study"    },
    { "title": "Note three", "content": "Content three", "category": "personal" }
  ]
}
```

**Success response — `201`:**
```json
{
  "success": true,
  "message": "3 notes created successfully",
  "data": [ ]
}
```

> Use `Note.insertMany()` for this endpoint.

---

### 3. GET `/api/notes` — Get all notes

**No request body needed.**

**Success response — `200`:**
```json
{
  "success": true,
  "message": "Notes fetched successfully",
  "data": [ ]
}
```

---

### 4. GET `/api/notes/:id` — Get note by ID

**No request body needed.**

**Success response — `200`:**
```json
{
  "success": true,
  "message": "Note fetched successfully",
  "data": { }
}
```

---

### 5. PUT `/api/notes/:id` — Replace a note completely

PUT means **full replacement**. Every field must be provided. Fields not sent will be reset to their default value.

**Request body:**
```json
{
  "title": "Completely new title",
  "content": "Completely new content",
  "category": "personal",
  "isPinned": false
}
```

**Success response — `200`:**
```json
{
  "success": true,
  "message": "Note replaced successfully",
  "data": { }
}
```

> Use `{ new: true, overwrite: true, runValidators: true }` options in your Mongoose call.

---

### 6. PATCH `/api/notes/:id` — Update specific fields only

PATCH means **partial update**. Only send the fields you want to change.

**Request body:**
```json
{
  "isPinned": true
}
```

**Success response — `200`:**
```json
{
  "success": true,
  "message": "Note updated successfully",
  "data": { }
}
```

> Use `{ new: true, runValidators: true }`. Other fields must remain unchanged.

---

### 7. DELETE `/api/notes/:id` — Delete a single note

**No request body needed.**

**Success response — `200`:**
```json
{
  "success": true,
  "message": "Note deleted successfully",
  "data": null
}
```

---

### 8. DELETE `/api/notes/bulk` — Delete multiple notes

**Request body:**
```json
{
  "ids": [
    "64b1f2c3e4d5a6b7c8d9e0f1",
    "64b1f2c3e4d5a6b7c8d9e0f2",
    "64b1f2c3e4d5a6b7c8d9e0f3"
  ]
}
```

**Success response — `200`:**
```json
{
  "success": true,
  "message": "3 notes deleted successfully",
  "data": null
}
```




---

## Validation Rules

- `title` and `content` required on create — return `400` if missing
- On any `/:id` route — validate ObjectId format first, return `400` if invalid
- On any `/:id` route — if note not found, return `404`
- On PATCH — if body is empty, return `400` with `"No fields provided to update"`
- On bulk create — if `notes` array is missing or empty, return `400`
- On bulk delete — if `ids` array is missing or empty, return `400`

---

## ⚙️ How to Run Locally

### 1️⃣ Clone Repository

```bash
git clone https://github.com/VishwaPatel892/Crud_Assignment
```

### 2️⃣ Go to Project Folder

```bash
cd 01
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Start Server

```bash
node index.js
```

Server will run on:

```
http://localhost:5000
```

---


## HTTP Status Codes

| Code | When to use |
|------|-------------|
| `200` | Successful GET, PUT, PATCH, DELETE |
| `201` | Successful POST — note(s) created |
| `400` | Missing required fields / empty body / invalid ObjectId / empty array |
| `404` | Note not found with that `_id` |
| `500` | Unexpected server or database error |

---
