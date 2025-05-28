# Real Estate AI Backend

This Node.js/Express backend allows agents to:

- View published and 'coming soon' property listings
- Sync interested buyer data directly to Salesforce CRM

## 🚀 Setup Instructions

1. Unzip this folder
2. Run `npm install` to install dependencies
3. Copy `.env.example` to `.env` and update values
4. Run the server using:

```bash
npm start
```

## 🔌 Endpoints

- `GET /api/listings?status=published` or `status=coming_soon`
- `POST /api/sync-lead` with JSON `{ name, email, interest, budget }`

## 📤 Salesforce Setup

- Create a connected app in Salesforce
- Enable OAuth and retrieve access token
- Paste token into `.env` under `SF_ACCESS_TOKEN`

## 🚀 Deployment

Use [Railway.app](https://railway.app) for easy deployment.