# 🚀 Quick Start - Install & Run

## Installation

```powershell
# Install frontend dependencies
npm install

# Install backend dependencies
cd AZANIKA\server
npm install
```

## Run Locally

**Terminal 1 - Start Backend:**
```powershell
cd AZANIKA\server
copy .env.example .env
# Edit .env with your MongoDB connection string
npm run dev
```

**Terminal 2 - Start Frontend:**
```powershell
npm run dev
```

## Access the Application

- **Customer Site**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin/login
  - Email: admin@azanika.com
  - Password: admin123

## Test Payment

Use Stripe test card:
- Card: 4242 4242 4242 4242
- Expiry: Any future date
- CVC: Any 3 digits

## Deploy for FREE

See DEPLOYMENT_GUIDE.md for complete deployment instructions to:
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

Total cost: $0/month! 🎉
