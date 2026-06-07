# GameVault

A minimal game library tracker. Built with React, Express, and MySQL.

---

## Stack

- **Frontend** — React + Vite, deployed on Vercel
- **Backend** — Express.js (Node), deployed on Railway
- **Database** — MySQL, hosted on Railway

---

## Local development

### Prerequisites
- Node.js 18+
- MySQL + MySQL Workbench
- Git

### 1. Database
Open MySQL Workbench and run `database/schema.sql`.
Or from terminal:
```bash
mysql -u root -p < database/schema.sql
```

### 2. Server
```bash
cd server
npm install
cp .env.example .env
# Edit .env — set DB_PASSWORD to your MySQL password
npm run dev
# Running on http://localhost:5000
```

Test with the REST Client extension in VS Code: open `server/api.http` and click "Send Request".

### 3. Client
Open a second terminal:
```bash
cd client
npm install
npm run dev
# Running on http://localhost:5173
```

---

## Deploying to Railway + Vercel

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/game-library-tracker.git
git push -u origin main
```

### Step 2 — Create Railway account
Go to [railway.app](https://railway.app) and sign up with your GitHub account.

### Step 3 — Deploy MySQL on Railway
1. In your Railway dashboard, click **New Project**
2. Click **Deploy MySQL**
3. Wait for it to start (about 30 seconds)
4. Click the MySQL service, then the **Connect** tab
5. Copy the connection credentials — you'll need them shortly
6. Open the **Query** tab and paste + run the contents of `database/schema.sql`

### Step 4 — Deploy Express server on Railway
1. In the same project, click **New** → **GitHub Repo**
2. Select your `game-library-tracker` repo
3. When asked for the root directory, type `server`
4. Railway will auto-detect Node and deploy it

**Add environment variables** (Railway dashboard → your server service → Variables tab):
```
MYSQLHOST      = (from MySQL service Connect tab)
MYSQLUSER      = (from MySQL service Connect tab)
MYSQLPASSWORD  = (from MySQL service Connect tab)
MYSQLDATABASE  = game_library
MYSQLPORT      = 3306
FRONTEND_URL   = https://your-app.vercel.app   ← add after Vercel deploy
```

5. After deploy, click your server service → **Settings** → copy the generated domain.
   It looks like: `https://game-library-server-production.up.railway.app`

### Step 5 — Deploy React frontend on Vercel
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **Add New Project** → import your `game-library-tracker` repo
3. Set the **Root Directory** to `client`
4. Under **Environment Variables**, add:
   ```
   VITE_API_URL = https://your-server.up.railway.app
   ```
   (the Railway domain from Step 4)
5. Click **Deploy**

### Step 6 — Final CORS update
Go back to Railway → server service → Variables and update:
```
FRONTEND_URL = https://your-app.vercel.app
```
Then redeploy the server (Railway does this automatically on variable change).

Done. Your app is live.

---

## API

| Method | Path            | Action         |
|--------|-----------------|----------------|
| GET    | /api/games      | List all games |
| GET    | /api/games/:id  | Get one game   |
| POST   | /api/games      | Add a game     |
| PUT    | /api/games/:id  | Update a game  |
| DELETE | /api/games/:id  | Delete a game  |

---

## Project structure

```
game-library-tracker/
├── client/                   React app (deploy root on Vercel)
│   ├── src/
│   │   ├── api.js            All Axios calls
│   │   ├── App.jsx           Routes
│   │   ├── index.css         Global styles
│   │   ├── components/       Navbar, GameCard, GameForm, FilterBar
│   │   └── pages/            HomePage, AddGamePage, EditGamePage
│   ├── vercel.json           SPA routing fix for Vercel
│   └── vite.config.js        Dev proxy + build config
│
├── server/                   Express API (deploy root on Railway)
│   ├── controllers/          CRUD logic
│   ├── routes/               URL mapping
│   ├── db.js                 MySQL pool (auto-detects Railway env vars)
│   ├── index.js              Entry point
│   ├── railway.toml          Railway build config
│   └── api.http              VS Code REST Client tests
│
└── database/
    └── schema.sql            Run once to create table + sample data
```
