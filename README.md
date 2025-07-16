#  VidNest – Video Sharing Platform (Node.js + EJS)

This is a full-stack web application. It allows users to register/login, upload videos, view a public video feed, and see recommended videos.

##  Features

-  **Authentication**
  - Register and login with secure password hashing using `bcrypt`
  - Email OTP verification and rate limiting
  - Reset password through Email OTP

-  **Video Upload with Cloudinary**
  - Authenticated users can upload videos
  - Videos are uploaded to **Cloudinary**
  - Metadata (title, description, Cloudinary URL, etc.) is saved in MongoDB

-  **Public Video Feed**
  - Paginated view of uploaded videos
  - Videos are streamed directly from Cloudinary

-  **Recommended Videos**
  - Suggests related videos based on simple matching logic (e.g., tags or categories)

---

##  Tech Stack

| Layer       | Tech                                      |
|-------------|-------------------------------------------|
| Backend     | Node.js, Express.js                       |
| Frontend    | EJS, HTML, CSS                            |
| Database    | MongoDB, Mongoose                         |
| File Upload | Multer + Cloudinary                       |
| Auth        | bcrypt, express-session (or JWT)          |
| Cloud       | Cloudinary SDK (for video storage/stream) |
| Extras      | Nodemailer (for OTP), dotenv              |

---

##  Cloudinary Integration

- Video files are uploaded using the official **Cloudinary Node SDK**.
- Uploads are streamed to Cloudinary using `multer` and a configured `storage` engine.
- The resulting `secure_url`, `public_id`, and metadata are saved to MongoDB.
- Videos are played in the frontend via their Cloudinary URL (which supports streaming).

   
