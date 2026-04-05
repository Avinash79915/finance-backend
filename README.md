#  Finance Dashboard Backend API

Zorvyn Assignment   finance backend system built using **Node.js, Express.js, and MongoDB** that manages financial records, user roles, and provides dashboard insights.

---

#  ASSUMPTIONS

* Role-based access is handled via headers
* No JWT authentication implemented (simplified for assignment)
* Admin creates users and records
* Analyst can view records and insights
* Viewer can only access summary

---

# ⚙️ FEATURES IMPLEMENTED

User Management (CRUD)
Role-Based Access Control
Financial Records CRUD
Filtering (type, category, date)
Pagination
Summary & Insights API
---

#  PROJECT STRUCTURE

```
src/
 ├── models/
 ├── controllers/
 ├── routes/
 ├── middleware/
 ├── config/
```

---
#  Project Flow and logic
![WhatsApp Image 2026-04-05 at 3 12 48 PM](https://github.com/user-attachments/assets/1ed45691-c60f-4144-a8bf-be81fa2fc3df)

#  Project Setup

##  Step 1: Clone Repository

```bash
git clone https://github.com/your-username/finance-backend.git
cd finance-backend
```

---

##  Step 2: Install Dependencies

```bash
npm install
```

---

##  Step 3: Create `.env` File

Create a `.env` file in the root folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

---

##  Step 4: Run Server

```bash
npm run dev
```

 Server will run on:

```
http://localhost:5000
```

---

#  MongoDB Setup

1. Create account on MongoDB Atlas
2. Create a free cluster
3. Create a database user
4. Get connection string

Example:

```
mongodb+srv://<username>:<password>@cluster.mongodb.net/financeDB
```

---

#  Authentication Note

This project uses **role-based access via headers (no JWT yet)**

👉 Add header in Postman:

```
Key: role
Value: admin | analyst | viewer
```

---

#  API BASE URL

```
http://localhost:5000/api
```

---

#  USER APIs

## ➤ Create User

POST

```
http://localhost:5000/api/users
```

### Body:

```json
{
  "name": "Avinash",
  "email": "avi@gmail.com",
  "password": "123456",
  "role": "admin"
}
```

 Access: Admin

---
<img width="1327" height="817" alt="image" src="https://github.com/user-attachments/assets/2aec7ca8-4ebb-41e0-882c-f21717c776b1" />

## ➤ Get All Users

GET

```
http://localhost:5000/api/users
```

### Header:

```
role: admin
```

 Access: Admin, Analyst

---
<img width="1377" height="905" alt="image" src="https://github.com/user-attachments/assets/eb37210a-c70d-45c5-a72f-c91982b12806" />

## ➤ Update User

PATCH

```
http://localhost:5000/api/users/:id
```

### Body:

```json
{
  "name": "Updated Name"
}
```

 Access: Admin
<img width="1370" height="762" alt="image" src="https://github.com/user-attachments/assets/96868979-df99-4de4-acff-39b08130d71a" />

---

## ➤ Delete User

SOFT DELETE

```
http://localhost:5000/api/users/:id
```

 Access: Admin

---

#  RECORD APIs

##  Create Record

POST

```
http://localhost:5000/api/records
```

### Header:

```
role: admin
```

### Body:

```json
{
  "amount": 5000,
  "type": "income",
  "category": "salary",
  "note": "monthly salary",
  "createdBy": "USER_ID"
}
```

---

##  Get Records (Filter + Pagination)

GET

```
http://localhost:5000/api/records?type=income&page=1&limit=2
```

### Header:

```
role: analyst
```

### Query Params:

| Param     | Description      |
| --------- | ---------------- |
| type      | income / expense |
| category  | category name    |
| startDate | YYYY-MM-DD       |
| endDate   | YYYY-MM-DD       |
| page      | page number      |
| limit     | records per page |

---

## ➤ Update Record

PATCH

```
http://localhost:5000/api/records/:id
```

👉 Access: Admin

---

##  Delete Record

DELETE

```
http://localhost:5000/api/records/:id
```

👉 Access: Admin

---

#  SUMMARY API (INSIGHTS)

##  Get Dashboard Summary

GET

```
http://localhost:5000/api/summary
```

### Header:

```
role: analyst
```

### Returns:

* Total Income
* Total Expense
* Net Balance
* Category-wise totals
* Recent activity
* Monthly trends

---



#  TESTING

All APIs tested using **Postman**

👉 Add header:

```
role: admin / analyst / viewer
```

---

#  API Error Handling & Responses

The API includes proper validation and role-based error handling to ensure correct usage.

---

##  1. Access Denied (Role Restriction)

### Scenario:

A user with insufficient role tries to perform a restricted action.

### Example:

* Analyst tries to DELETE a record
<img width="1347" height="865" alt="image" src="https://github.com/user-attachments/assets/7d15fc8c-6f65-4dac-83f2-165efab4680f" />

### Request:

```http
DELETE /api/records/:id
```

### Header:

```plaintext
role: analyst
```

### Response:

```json
{
  "message": "Access denied "
}
```

---

##  2. Role Not Provided

### Scenario:

Header does not include role

### Response:

```json
{
  "message": "Role not provided "
}
```

---

##  3. Duplicate Email Error

### Scenario:

Trying to create a user with an existing email

### Response:

```json
{
  "error": "E11000 duplicate key error collection: users email already exists"
}
```
<img width="1373" height="857" alt="image" src="https://github.com/user-attachments/assets/4f21df3b-9c32-421e-ac84-7d95100aa8bf" />

---

##  4. Resource Not Found

### Scenario:

Trying to update/delete non-existing user or record

### Example:

```http
PATCH /api/users/:id
```

### Response:

```json
{
  "message": "User not found"
}
```

---

##  5. Validation Error

### Scenario:

Missing required fields

### Example:

```json
{
  "amount": ""
}
```

### Response:

```json
{
  "error": "Record validation failed: amount is required"
}
```

---

##  6. Invalid ObjectId

### Scenario:

Invalid `createdBy` or wrong ID format

### Response:

```json
{
  "error": "Cast to ObjectId failed"
}
```

---

##  7. Invalid Query Parameters

### Scenario:

Wrong filter value

### Example:

```http
GET /api/records?type=random
```

### Response:

```json
[]
```

👉 No matching records found

---

## 🧠 Note

* All protected routes use role-based middleware
* Proper HTTP status codes are used:

  * 200 → Success
  * 201 → Created
  * 400 → Bad Request
  * 401 → Unauthorized
  * 403 → Forbidden
  * 404 → Not Found
  * 500 → Server Error

---


#  API SUMMARY LIST

### 👤 Users

* POST /api/users
* GET /api/users
* PATCH /api/users/:id
* DELETE /api/users/:id

### Records

* POST /api/records
* GET /api/records
* PATCH /api/records/:id
* DELETE /api/records/:id

###  Summary

* GET /api/summary

---
