Video Streaming App
An application for displaying and streaming video files with a selectable video list. The frontend is built with React, and the backend uses Node.js with Express and MySQL database to store video metadata.

Description
Sidebar video list display (React component)

Click on a video to select and play it in the video player

Video is streamed from the backend server supporting HTTP Range requests (partial streaming)

Video metadata is stored in a MySQL database

Backend reads video files from disk based on the path stored in the database

Frontend dynamically updates the video being played

Technologies
Frontend: React, CSS

Backend: Node.js, Express

Database: MySQL

Streaming: fs.createReadStream with support for Range HTTP header

Installation and Running
Backend
Clone the repository and navigate to the backend folder:

bash
Копирај
Измени
cd backend
Install dependencies:

bash
Копирај
Измени
npm install
Configure .env file with your database credentials:

ini
Копирај
Измени
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=videoDatabase
PORT=5000
Start the backend server:

bash
Копирај
Измени
npm run dev
Frontend
Navigate to the frontend folder:

bash
Копирај
Измени
cd frontend
Install dependencies:

bash
Копирај
Измени
npm install
Start the React development server:

bash
Копирај
Измени
npm start
Project Structure
php
Копирај
Измени
backend/
  controllers/
    streamController.js    # video streaming logic
  routes/
    streamRoutes.js        # route handling streaming with :id param
  videos/                  # folder containing video files
  db.js                    # MySQL database connection
  index.js                 # main server file

frontend/
  components/
    AllVideosComponent.jsx # component displaying video list
    CardComponent.jsx      # individual video card component
  pages/
    VideoPlayer.jsx        # main page with video player and list
  public/
    Video-Player-Icon-Transparent-PNG.png
  src/
    services/              # API service calls
How It Works
Frontend fetches the list of videos from API endpoint /api/getAll

User clicks a video in the list, sending the selected video id up to the parent component (VideoPlayer)

VideoPlayer constructs the video URL: http://localhost:5000/api/stream/:id

Backend receives the request with the id parameter, queries the database for file info, and accesses the file on disk

Backend streams the video with support for HTTP range requests (partial content loading)

Video is displayed in the React <video> element

Notes
Video files are stored locally in the backend videos/ folder

Database stores paths and metadata for video files

API server must be running to serve video content

Frontend and backend run separately; configure CORS if needed

Future Improvements
Add user authentication

Add video upload functionality

Add pagination and search for videos

Implement video transcoding for multiple resolutions
