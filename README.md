<div align="center">

# 🚀 InstaBizWeb

### Digital Solutions for Business Growth

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express_5-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**A full-stack business website with a working enquiry pipeline — REST API, PostgreSQL persistence, JWT admin authentication and a complete enquiry-management panel.**

[🌐 Live Demo](https://main.dkissz3r2xx4g.amplifyapp.com) • [🛠️ Admin Panel](https://main.dkissz3r2xx4g.amplifyapp.com/admin) • [🚀 Quick Start](#-end-to-end-setup)

</div>

---

## 🔗 Project Links

<table>
<tr>
<td align="center" width="50%">

### 🌐 **Frontend**
[![AWS Amplify](https://img.shields.io/badge/AWS_Amplify-FF9900?style=for-the-badge&logo=awsamplify&logoColor=white)](#)

[View Live Site →](https://main.dkissz3r2xx4g.amplifyapp.com/why-choose-us)

</td>
<td align="center" width="50%">

### ⚙️ **Backend**
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)](#)

[API Server →](https://instabizweb.onrender.com/api/health)

</td>
</tr>
</table>

> ⏳ **Hosting note:** the API runs on Render's free tier, which idles after inactivity. The first request after a pause can take up to a minute to wake the service — later requests respond normally. If the admin panel seems to hang on first load, open the health-check URL once and retry.

---

## 🎯 Problem Statement

Small and mid-sized businesses lose leads before anyone ever reads them, because their "digital presence" stops at a brochure page:

<table>
<tr>
<td width="50%">

### 📋 **Current Pain Points**

- 📄 **Static websites** that display information but capture nothing
- 📭 **Enquiries land in an inbox** and get buried or missed
- 🗂️ **No single record** of who asked for what, and when
- 🕒 **No follow-up state** — nobody knows which lead was contacted
- 🔓 **Unprotected admin pages** guarded only by an obscure URL
- 🧩 **Scattered tooling** across forms, sheets and WhatsApp threads

</td>
<td width="50%">

### ✅ **Our Solution**

- 📝 **Working enquiry form** with client *and* server validation
- 🗄️ **PostgreSQL persistence** — every lead is a durable row
- 🔐 **JWT-protected admin panel** for managing enquiries
- 🔄 **Status workflow** — `Pending` → `Contacted` → `Resolved`
- 🔍 **Search, filters & pagination** over the full enquiry list
- 🧭 **One source of truth** shared by the site and the panel

</td>
</tr>
</table>

---

## 🚀 Key Features

<table>
<tr>
<td width="50%">

### 🌍 **Public Website**

- 🏠 **Home Page**
  - Positioning, problem/solution and process
  - Featured capabilities & differentiators
  - Conversion-focused CTA section

- 🧾 **Service Catalogue**
  - Nine services grouped into four outcomes
  - Build · Manage · Automate · Grow
  - One shared catalogue drives site + form

- 📬 **Enquiry Form**
  - Name, email, phone, company, service, message
  - Inline field errors and success feedback
  - Posts straight to the REST API

</td>
<td width="50%">

### 🛠️ **Admin Panel**

- 🔐 **Secure Login**
  - Email + password checked against a bcrypt hash
  - JWT issued on success, valid for 1 day
  - Dashboard unreachable without a valid token

- 📊 **Enquiry Management**
  - Table: Name, Email, Phone, Company, Service, Date
  - View details, edit, update, delete
  - Delete guarded by a confirmation dialog

- 🔎 **List Controls**
  - Search across every enquiry field
  - Service and status filters
  - Pagination at 10 rows per page

</td>
</tr>
</table>

### 🌟 **Additional Features**

- 🔐 **JWT Authentication** — every admin read/write route is token-protected
- 🛡️ **Server-Side Validation** — a whitelist of services and statuses, enforced in the API
- 📱 **Mobile-First Design** — responsive from 360 px; the table becomes a card list on small screens
- ♿ **Accessibility** — semantic headings, labelled inputs, visible focus rings, `prefers-reduced-motion` respected
- 🔍 **SEO Ready** — per-page titles, descriptions, Open Graph metadata, canonical URLs, favicon
- 🎨 **Modern UI/UX** — loading skeletons plus empty, no-results and error states throughout
- ⚡ **Fast Performance** — Next.js App Router with server components where possible

---

## 🛠️ Tech Stack

### **Frontend**
<p>
<img src="https://img.shields.io/badge/Next.js_15-000000?style=flat&logo=nextdotjs&logoColor=white" alt="Next.js" />
<img src="https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB" alt="React" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
<img src="https://img.shields.io/badge/Context_API-61DAFB?style=flat&logo=react&logoColor=black" alt="Context API" />
<img src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat&logo=reacthookform&logoColor=white" alt="React Hook Form" />
<img src="https://img.shields.io/badge/Lucide_React-F56565?style=flat&logo=lucide&logoColor=white" alt="Lucide React" />
</p>

### **Backend**
<p>
<img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/Express_5-404D59?style=flat&logo=express&logoColor=white" alt="Express" />
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white" alt="PostgreSQL" />
<img src="https://img.shields.io/badge/node--postgres-336791?style=flat&logo=postgresql&logoColor=white" alt="node-postgres" />
<img src="https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white" alt="JWT" />
<img src="https://img.shields.io/badge/bcryptjs-004488?style=flat&logo=letsencrypt&logoColor=white" alt="bcryptjs" />
</p>

### **Deployment**
<p>
<img src="https://img.shields.io/badge/AWS_Amplify-FF9900?style=flat&logo=awsamplify&logoColor=white" alt="AWS Amplify" />
<img src="https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=black" alt="Render" />
<img src="https://img.shields.io/badge/Managed_PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white" alt="Managed PostgreSQL" />
</p>

---

## 📁 Architecture Overview

```mermaid
graph TB
    A[Client - Next.js 15 App Router] -->|POST /api/enquiries| B[Express 5 API]
    A -->|JWT Auth| B
    B -->|CRUD via node-postgres| C[(PostgreSQL)]
    B -->|Validation Whitelist| D[enquiryValidator]
    B -->|Bearer Token Check| E[authMiddleware]
    A -->|Session State| F[AuthContext]
    A -->|Form Handling| G[React Hook Form]
    A -->|Fetch Wrappers| H[lib/api.js]
```

### **System Architecture**

- **Three-Tier Architecture** — Next.js client, Express API, PostgreSQL database
- **MVC on the Backend** — routes → controllers → validators, with `pg` as the data layer
- **Token-Based Access Control** — one public write route, every other route behind JWT
- **RESTful API Design** — predictable resource endpoints with a consistent JSON envelope
- **Single Source of Truth** — the frontend service catalogue mirrors the backend whitelist exactly
- **Scalable Design** — the three pieces deploy and scale independently

---

## 📂 Project Structure

```
root
├─ 🔧 backend/
│  ├─ db/
│  │  ├─ db.js                     # pg Pool + SSL handling
│  │  └─ 🗄️ migrations/
│  │     ├─ 001_initial.sql        # admins + enquiries tables
│  │     └─ 002_add_enquiry_status.sql
│  ├─ 📜 scripts/
│  │  ├─ migrate.js                # Apply migrations in filename order
│  │  └─ seed-admin.js             # Create the first admin (bcrypt cost 12)
│  ├─ src/
│  │  ├─ 🎮 controllers/           # Route handlers
│  │  │  ├─ authController.js
│  │  │  └─ enquiryController.js
│  │  ├─ 🛣️ routes/                # Express routers
│  │  │  ├─ authRoutes.js
│  │  │  └─ enquiryRoutes.js
│  │  ├─ 🔒 middleware/            # Auth & error handling
│  │  │  ├─ authMiddleware.js
│  │  │  └─ errorMiddleware.js
│  │  ├─ ✅ validators/            # Server-side validation
│  │  │  └─ enquiryValidator.js
│  │  ├─ app.js                    # Express app + /api/health
│  │  └─ server.js                 # Application entry point
│  └─ package.json
│
└─ 💻 frontend/
   ├─ 📄 app/                      # Next.js App Router
   │  ├─ page.js                   # Home
   │  ├─ about/page.js
   │  ├─ services/page.js
   │  ├─ why-choose-us/page.js
   │  ├─ contact/page.js           # Enquiry form
   │  ├─ admin/page.js             # Login
   │  ├─ admin/dashboard/page.js   # Enquiry management
   │  ├─ layout.js
   │  └─ globals.css
   ├─ 🎨 components/
   │  ├─ layout/                   # Navbar, Footer, LayoutShell, Logo
   │  ├─ sections/                 # Hero, ServiceStack, WhyUs, Process, CTA
   │  ├─ admin/                    # AdminShell, EnquiryTable, Dialogs, Pagination
   │  ├─ forms/                    # EnquiryForm
   │  ├─ visuals/                  # EcosystemDiagram, Mockups
   │  └─ ui/                       # Button, Field, Icon, Section, Reveal
   ├─ 🏪 context/
   │  └─ AuthContext.js            # Token + admin session state
   ├─ 🛠️ lib/
   │  ├─ api.js                    # Fetch wrappers for every endpoint
   │  ├─ services.js               # Service catalogue (mirrors API whitelist)
   │  ├─ adminConstants.js         # Statuses, page size, pagination range
   │  ├─ site.js                   # Company facts
   │  └─ cn.js                     # Class-name helper
   └─ package.json
```

---

## 🚀 End-to-End Setup

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- ![Node.js](https://img.shields.io/badge/Node.js-18+-43853D?style=flat&logo=node.js&logoColor=white) **Node.js 18+**
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Running-4169E1?style=flat&logo=postgresql&logoColor=white) **PostgreSQL** (local or managed)
- ![npm](https://img.shields.io/badge/npm-8+-CB3837?style=flat&logo=npm&logoColor=white) **npm** or **yarn**

---

### ⚙️ Backend Setup

1️⃣ **Navigate to backend directory and install dependencies:**
```bash
cd backend
npm install
```

2️⃣ **Create `.env` file** in `backend/` directory (see [Example .env Files](#-example-env-files) below)

3️⃣ **Create the database, apply migrations and seed an admin:**
```bash
# In psql
CREATE DATABASE instabizweb;

# Back in your shell
node scripts/migrate.js
node scripts/seed-admin.js
```

4️⃣ **Start development server:**
```bash
npm run dev
```

5️⃣ **Expected output:**
```bash
✅ Server running on port 5000
```

Verify the database link at `http://localhost:5000/api/health`:
```json
{ "status": "ok", "message": "InstaBizWeb API and database are running", "database": "connected" }
```

Routes will be available at: `http://localhost:5000/api/*`

---

### 💻 Frontend Setup

1️⃣ **Navigate to frontend directory and install dependencies:**
```bash
cd frontend
npm install
```

2️⃣ **Create `.env.local` file** in `frontend/` directory (see [Example .env Files](#-example-env-files) below)

3️⃣ **Start development server:**
```bash
npm run dev
```

4️⃣ **Open your browser:**
```
🌐 http://localhost:3000
```

---

## 📖 Usage Guide

### 🔐 Getting Started

**For Visitors (Prospective Clients):**
1. Browse Home, About, Services and Why Choose Us
2. Open the Contact page
3. Fill in your details and pick a service
4. Submit and receive instant confirmation
5. Your enquiry is stored and visible to the team

**For Admins:**
1. Go to `/admin` and log in
2. Review every enquiry received, newest first
3. Search and filter by service or status
4. Open, edit or delete individual enquiries
5. Move each lead through its status workflow

---

### 📬 Submitting an Enquiry

1. Click **"Contact"** in the navigation
2. Fill in the form:
   - Full name, email, phone
   - Company name
   - Service (from the nine-service catalogue, or *Other*)
   - Message
3. Client-side validation catches obvious mistakes first
4. Click **"Submit"**
5. The API validates again, stores the row and returns a confirmation

> 🔒 The public create route always forces `status = 'Pending'` and discards any status a client tries to send.

---

### 📊 Tracking Enquiry Status

**Status Workflow:**
- 📥 **Pending** — enquiry received, not yet actioned
- 📞 **Contacted** — someone has reached out to the lead
- ✅ **Resolved** — the conversation is complete

**Dashboard Controls:**
- Search across name, email, company and message
- Filter by service, filter by status
- Paginate at 10 enquiries per page
- Skeletons while loading, plus distinct empty / no-results / error states

---

### 🛠️ Admin Operations

**Daily Workflow:**
1. Log in at `/admin`
2. Scan new `Pending` enquiries at the top of the list
3. Open one to read the full message
4. Contact the lead, then set the status to `Contacted`
5. Mark it `Resolved` once the conversation closes

**Data Management:**
- Edit any field of an enquiry through the edit dialog
- The service dropdown only offers values the backend accepts
- Delete requires an explicit confirmation
- On mobile the table becomes a card list instead of scrolling sideways

---

## 📜 Scripts

### Backend Commands
```bash
npm run dev                  # Start the API
npm start                    # Run production server
node scripts/migrate.js      # Apply database migrations
node scripts/seed-admin.js   # Seed the first admin account
```

### Frontend Commands
```bash
npm run dev      # Start Next.js dev server
npm run build    # Build for production
npm start        # Serve the production build
npm run lint     # Run ESLint
```

---

## 🔧 Example .env Files

### `backend/.env`
```env
# PostgreSQL connection string
DATABASE_URL=postgresql://user:password@host:5432/instabizweb

# Set true when the database requires SSL (most cloud providers do)
DATABASE_SSL=false

# Secret used to sign JWTs — use a long random string, never commit it
JWT_SECRET=your-long-random-secret

# Origin allowed by CORS — the deployed frontend URL in production
CORS_ORIGIN=http://localhost:3000

# Seed credentials for the first admin (used once by seed-admin.js)
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=choose-a-strong-password

# Optional — defaults to 5000
PORT=5000
```

### `frontend/.env.local`
```env
# Backend API origin
NEXT_PUBLIC_API_URL=http://localhost:5000

# Public site origin — used for canonical URLs and Open Graph metadata
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> ⚠️ Both env files are listed in `.gitignore` and are never committed. Only `NEXT_PUBLIC_*` variables reach the browser — no secret is ever exposed to frontend code.

---

## 🗄️ Database Schema

### **`admins`**

| Column | Type | Notes |
|--------|------|-------|
| `id` | `SERIAL` | Primary key |
| `name` | `VARCHAR(100)` | Required |
| `email` | `VARCHAR(255)` | Required, **unique** |
| `password_hash` | `VARCHAR(255)` | bcrypt hash, cost 12 |
| `created_at` | `TIMESTAMP` | Defaults to now |
| `updated_at` | `TIMESTAMP` | Defaults to now |

### **`enquiries`**

| Column | Type | Notes |
|--------|------|-------|
| `id` | `SERIAL` | Primary key |
| `full_name` | `VARCHAR(100)` | Required |
| `email` | `VARCHAR(255)` | Required, format-validated |
| `phone` | `VARCHAR(30)` | Required, format-validated |
| `company_name` | `VARCHAR(150)` | Required |
| `service` | `VARCHAR(100)` | Must match the server whitelist |
| `message` | `TEXT` | Required, max 2000 characters |
| `status` | `VARCHAR(20)` | `Pending` / `Contacted` / `Resolved`, defaults to `Pending` |
| `created_at` | `TIMESTAMP` | Defaults to now |
| `updated_at` | `TIMESTAMP` | Bumped on every update |

---

## 🎯 API Endpoints

### **Authentication**
```
POST   /api/auth/login             # Admin login → { admin, token }
```

### **Enquiries**
```
POST   /api/enquiries              # Create enquiry (public, no token)
GET    /api/enquiries              # List all enquiries          🔒
GET    /api/enquiries/:id          # Get enquiry details         🔒
PUT    /api/enquiries/:id          # Update enquiry + status     🔒
DELETE /api/enquiries/:id          # Delete enquiry              🔒
```

### **System**
```
GET    /api/health                 # API + database connectivity check
```

> 🔒 Routes marked with a lock require an `Authorization: Bearer <token>` header.

### **Status Codes**

| Code | Meaning |
|------|---------|
| `200` | Request succeeded |
| `201` | Enquiry created |
| `400` | Validation failed or invalid ID |
| `401` | Missing, malformed or expired token / bad credentials |
| `404` | Enquiry not found |
| `500` | Server or database error |

---

## 🐛 Troubleshooting

<details>
<summary><b>❌ PostgreSQL Connection Error</b></summary>

**Solution:**
- Confirm PostgreSQL is running and the database exists
- Check `DATABASE_URL` in `backend/.env` — user, password, host, port, database name
- For managed databases set `DATABASE_SSL=true` (SSL is also enabled automatically when `NODE_ENV=production`)
- Hit `GET /api/health` — it reports `database: disconnected` when the pool cannot reach Postgres
- Restart the backend after any `.env` change
</details>

<details>
<summary><b>❌ JWT Authentication Error</b></summary>

**Solution:**
- Verify `JWT_SECRET` is set in `backend/.env`
- Tokens expire after 1 day — log in again
- Ensure the header format is exactly `Authorization: Bearer <token>`
- Clear browser `localStorage` and log in again
</details>

<details>
<summary><b>❌ CORS Error from Frontend</b></summary>

**Solution:**
- `CORS_ORIGIN` must match the frontend origin **exactly** — protocol, host and port
- Default for local development: `http://localhost:3000`
- In production set it to the deployed Amplify URL, with no trailing slash
- Restart the backend after changing it
</details>

<details>
<summary><b>❌ Enquiry Submission Fails with "Invalid service selection"</b></summary>

**Solution:**
- The API accepts only whitelisted values from `backend/src/validators/enquiryValidator.js`
- The frontend posts `enquiryValue`, not the display label — check `frontend/lib/services.js`
- Any new service must be added in **both** places or the server returns `400`
</details>

<details>
<summary><b>❌ Admin Seeding Fails</b></summary>

**Solution:**
- `ADMIN_NAME`, `ADMIN_EMAIL` and `ADMIN_PASSWORD` must all be set in `backend/.env`
- `email` is `UNIQUE` — re-running with an existing email fails instead of creating a duplicate
- Run `node scripts/migrate.js` before seeding, so the `admins` table exists
</details>

<details>
<summary><b>❌ Admin Panel Hangs on First Load</b></summary>

**Solution:**
- The Render free tier idles after inactivity; the first request can take up to a minute
- Open `https://instabizweb.onrender.com/api/health` once to wake the service, then retry
- Confirm `NEXT_PUBLIC_API_URL` points at the deployed backend, not `localhost`
</details>

---

## 🔒 Security Features

> **🔐 Security Best Practices Implemented:**

- ✅ **JWT Authentication** — signed tokens with a 1-day expiry
- ✅ **Password Hashing** — bcrypt at cost 12; plain text is never stored
- ✅ **Parameterised Queries** — every query uses placeholders, so SQL injection has no surface
- ✅ **Server-Side Validation** — length, format and whitelist checks independent of the client
- ✅ **Status Whitelisting** — only `Pending`, `Contacted` and `Resolved` are accepted
- ✅ **Privilege Enforcement** — the public create route strips any client-supplied `status`
- ✅ **CORS Protection** — a single configured origin, not a wildcard
- ✅ **Generic Auth Errors** — login never reveals whether the email or the password was wrong
- ✅ **Secrets Kept Server-Side** — no secret is exposed through a `NEXT_PUBLIC_*` variable

> **⚠️ Production Security Checklist:**

- 🔐 Use a long random `JWT_SECRET`, different from development
- 🌐 Enable HTTPS everywhere and set `DATABASE_SSL=true`
- 🎯 Point `CORS_ORIGIN` at the exact deployed frontend origin
- 🔑 Seed the production admin with a password that is not the local one
- 📝 Keep dependencies patched and audit them regularly
- 📊 Monitor `/api/health` and watch for repeated `401` responses
- 🛡️ Add rate limiting on `/api/auth/login` before opening the panel widely

---

## 🚢 Deployment

The three pieces deploy independently.

| Piece | Platform | URL |
|-------|----------|-----|
| 🌐 Frontend | **AWS Amplify** | https://main.dkissz3r2xx4g.amplifyapp.com |
| ⚙️ Backend API | **Render** | https://instabizweb.onrender.com |
| 🗄️ Database | **Managed PostgreSQL** | Private — reached via `DATABASE_URL` |

### **Backend Settings**

| Setting | Value |
|---------|-------|
| Root directory | `backend` |
| Build command | `npm install` |
| Start command | `npm start` |
| Environment | `DATABASE_URL`, `DATABASE_SSL=true`, `JWT_SECRET`, `CORS_ORIGIN`, `NODE_ENV=production` |

### **Frontend Settings**

| Setting | Value |
|---------|-------|
| Root directory | `frontend` |
| Build command | `npm run build` |
| Start command | `npm start` |
| Environment | `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL` |

### **Deployment Checklist**

- [ ] Migrations applied against the production database
- [ ] Admin seeded with a production-only password
- [ ] `JWT_SECRET` is long, random and different from development
- [ ] `CORS_ORIGIN` matches the deployed frontend origin exactly
- [ ] `NEXT_PUBLIC_API_URL` points at the deployed backend, not `localhost`
- [ ] `/api/health` returns `database: connected`
- [ ] An enquiry submitted on the live site appears in the live admin panel

---

## 📊 System Metrics

### **Performance Targets**
- ⚡ Page Load Time: < 2 seconds
- 🔄 API Response Time: < 500ms (once the service is warm)
- 📱 Responsive from 360 px upward
- 🔐 Token Lifetime: 24 hours

### **Success Metrics**
- ✅ 100% of enquiries persisted to PostgreSQL — nothing kept in `localStorage`
- 🛡️ 0 unvalidated writes — every field is checked on the server
- 📉 0 leads lost between the form and the admin panel
- 🔒 0 admin routes reachable without a valid token

---

## 🎨 UI/UX Highlights

- **🎯 Clear Hierarchy** — nine services grouped into four outcomes rather than nine equal cards
- **📱 Mobile-First Design** — mobile layouts designed, not shrunk; the admin table becomes cards
- **🎨 Consistent Design System** — shared `Button`, `Field`, `Section` and `Icon` primitives
- **⚡ Considered Loading States** — skeletons instead of spinners on the enquiry table
- **♿ Accessibility** — semantic headings, labelled inputs, visible focus rings, keyboard navigation
- **🎬 Respectful Motion** — reveal animations that honour `prefers-reduced-motion`
- **🔔 Honest Feedback** — distinct empty, no-results and error states, plus real server messages
- **🔍 SEO Ready** — per-page metadata, Open Graph tags and canonical URLs

---

## 🚧 Roadmap & Future Enhancements

### **Phase 1 (Current)** ✅
- [x] Public marketing website across five pages
- [x] Working enquiry form with client and server validation
- [x] PostgreSQL persistence with migrations
- [x] JWT admin authentication
- [x] Full enquiry CRUD with search, filters and pagination
- [x] Status workflow (`Pending` / `Contacted` / `Resolved`)

### **Phase 2 (Next)** 🔄
- [ ] Email notification on new enquiry
- [ ] Rate limiting on the login and enquiry endpoints
- [ ] CSV export of the enquiry list
- [ ] Server-side pagination and search for large volumes
- [ ] Assignment of enquiries to specific admins

### **Phase 3 (Future)** 📅
- [ ] Multi-admin roles and permissions
- [ ] Analytics dashboard — enquiries by service and by period
- [ ] Audit log of every admin action
- [ ] Refresh tokens and httpOnly cookie sessions
- [ ] Automated test suite and CI pipeline

---

## 👥 Target Audience

<table>
<tr>
<td align="center" width="33%">

### 🏢 **Business Owners**
SMBs looking for a technology partner across web, software, automation and marketing

</td>
<td align="center" width="33%">

### 📞 **Sales & Support Teams**
Staff who need every enquiry in one place with a clear follow-up state

</td>
<td align="center" width="33%">

### 👨‍💼 **Admins**
Administrators managing the enquiry pipeline end to end from a secure panel

</td>
</tr>
</table>

---

## 🌟 Unique Selling Points (USP)

<table>
<tr>
<td width="50%">

### **For Visitors**
- ⚡ **Fast, Clear Site** — services grouped by outcome, not by jargon
- 📝 **A Real Form** — validated, persisted and answered, not a dead mailto
- 📱 **Works Everywhere** — designed for mobile from the start
- ♿ **Accessible** — keyboard-navigable with visible focus states

</td>
<td width="50%">

### **For the Business**
- 🗄️ **Durable Lead Record** — every enquiry is a row, not an email
- 🔐 **Secure by Default** — hashed passwords and token-guarded routes
- 🔄 **Follow-Up Workflow** — status makes ownership obvious
- 📈 **Ready to Extend** — clean separation of client, API and database

</td>
</tr>
</table>

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. 💻 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔀 Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 📧 Contact & Support

<div align="center">

**Need help or have questions?**

📧 Email: [info@instabizweb.com](mailto:info@instabizweb.com)  
📞 Phone: 6355312073  
🐙 GitHub: [InstaBizWeb Repository](https://github.com/homasvikaneria/InstaBizWeb)

**Found this project helpful? Give it a ⭐ on GitHub!**

</div>

---

<div align="center">

### 🚀 Digital Solutions for Business Growth

**Made with 💙 and ☕**

**Happy Building! 🚀✨**

---

*Last Updated: September 2026*

</div>