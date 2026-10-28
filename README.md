# 🌍 Wanderlust — Travel & Destination Booking Platform

Wanderlust is a travel and destination booking web application where users can explore travel destinations, view package details, manage destinations, and make bookings through an interactive interface.

🔗 **Live Website:** [Wanderlust](https://wanderlust-nine-theta-56.vercel.app/)

## ✨ Features

- 🌎 Browse available travel destinations
- 🔍 View individual destination details
- 🔐 User authentication with Better Auth
- ➕ Add new travel destinations
- ✏️ Edit existing destination information
- 🗑️ Delete destinations
- 🧳 Book travel packages
- 📋 View and manage personal bookings
- 🔒 Protected API routes with JWT verification
- 📱 Responsive user interface
- ⚡ Dynamic data fetching with Next.js

## 🛠️ Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Better Auth
- JWT Authentication
- Jose

### Deployment
- Vercel

## 🏗️ Project Structure

```text
wanderlust/
├── src/
│   ├── app/
│   │   ├── destination/
│   │   ├── add-destination/
│   │   ├── my-bookings/
│   │   └── components/
│   ├── components/
│   └── lib/
├── public/
├── .env.local
├── package.json
└── README.md
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd wanderlust
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Make sure your backend server is running and its URL matches the configured environment variable.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔗 Backend API

The frontend communicates with an Express.js backend to retrieve and manage destination and booking data.

Example endpoints:

- `GET /destinations` — Retrieve destinations
- `GET /destinations/:id` — Retrieve a destination by ID
- `POST /add-destination` — Add a destination
- `PUT /destinations/:id` — Update a destination
- `DELETE /destinations/:id` — Delete a destination
- `POST /bookings` — Create a booking

Protected endpoints require valid authentication.

## 🌐 Live Demo

Experience the application here:

**[Visit Wanderlust →](https://wanderlust-nine-theta-56.vercel.app/)**

## 👨‍💻 Developer

**Fuad Al Maimun**  
Junior Full Stack Developer

- GitHub: [FuadAlMaimun-1](https://github.com/fuadalmaimun)
- LinkedIn: [Fuad Al Maimun](https://www.linkedin.com/in/fuad-al-maimun-97ba42399/)

## 📄 License

This project was developed for learning and portfolio purposes.
