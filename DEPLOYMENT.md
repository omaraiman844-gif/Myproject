# Deployment Guide (Render + Vercel)

## 1) Deploy Django API to Render

Render will use:
- `build.sh` for build/migrations/static collection
- `gunicorn Businessproject.wsgi:application` to start the app

### Option A: Blueprint deploy (recommended)
1. Push this repository to GitHub.
2. In Render, click **New +** -> **Blueprint**.
3. Select your repo; Render reads `render.yaml`.
4. Set `CORS_ALLOWED_ORIGINS` to your actual Vercel domain after frontend deploy.

### Option B: Manual web service
1. New Web Service -> connect repo.
2. Root Directory: `.`
3. Build Command: `./build.sh`
4. Start Command: `gunicorn Businessproject.wsgi:application`
5. Add env vars: `DEBUG=False`, `SECRET_KEY`, `ALLOWED_HOSTS=.onrender.com`, `DATABASE_URL`, `CORS_ALLOWED_ORIGINS`.

## 2) Deploy React app to Vercel

This repo frontend is in `my-new-frontend/`.

1. In Vercel, import repo.
2. Framework preset: **Create React App**.
3. Root Directory: `my-new-frontend`
4. Add env var: `REACT_APP_API_BASE_URL=https://<your-render-service>.onrender.com`
5. Deploy.

## 3) Final wiring

After Vercel deploy gives URL like `https://your-app.vercel.app`:
1. Update Render env var `CORS_ALLOWED_ORIGINS` to that exact URL.
2. Redeploy Render service.

## 4) DNS/custom domains (optional)

- Add custom API domain in Render (e.g., `api.example.com`) and set `ALLOWED_HOSTS` accordingly.
- Add frontend domain in Vercel and include it in `CORS_ALLOWED_ORIGINS`.
