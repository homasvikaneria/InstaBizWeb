<!-- README.md -->
<div align="center">

# InstaBizWeb

### Digital Solutions for Business Growth

A full-stack business website with a working enquiry pipeline, REST API, PostgreSQL persistence, JWT admin authentication and a complete enquiry-management panel.

<br />

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

</div>

---

## Table of Contents

1. [Overview](#1-overview)
2. [Live Links](#2-live-links)
3. [Features](#3-features)
4. [Tech Stack](#4-tech-stack)
5. [Architecture](#5-architecture)
6. [Application Flow](#6-application-flow)
7. [Project Structure](#7-project-structure)
8. [Database Schema](#8-database-schema)
9. [API Endpoints](#9-api-endpoints)
10. [Environment Variables](#10-environment-variables)
11. [Local Setup](#11-local-setup)
12. [Database & Admin Setup](#12-database--admin-setup)
13. [Deployment](#13-deployment)
14. [Testing](#14-testing)
15. [Security Notes](#15-security-notes)
16. [AI-Assisted Development](#16-ai-assisted-development)

---

## 1. Overview

InstaBizWeb is positioned as a **technology partner**, not a software vendor — a business engaged for the outcome rather than a fixed list of deliverables. The site communicates that across nine services, and backs it with a genuinely working enquiry pipeline.

The project is a two-part application:

| Part | Responsibility |
|------|----------------|
| **Public website** | Marketing pages and the enquiry form that captures leads |
| **Admin panel** | Authenticated interface at `/admin` for managing every enquiry received |

An enquiry submitted on the public site travels **Website → REST API → PostgreSQL** and appears in the admin panel. Nothing is stored in `localStorage`, and there is no mock API anywhere in the submission path.

---

## 2. Live Links

| Resource | URL |
|----------|-----|
| **Live Website** | https://main.dkissz3r2xx4g.amplifyapp.com |
| **Admin Panel** | https://main.dkissz3r2xx4g.amplifyapp.com/admin |
| **Backend API** | https://instabizweb.onrender.com |
| **API Health Check** | https://instabizweb.onrender.com/api/health |
| **GitHub Repository** | https://github.com/homasvikaneria/InstaBizWeb |

### Admin login credentials

| Field | Value |
|-------|-------|
| **Email** | `admin@gmail.com` |
| **Password** | `admin@123` |

> Hosting note: the API runs on Render's free tier, which idles after a period of inactivity. The first request after a pause can take up to a minute to wake the service — subsequent requests respond normally. If the admin panel appears to hang on first load, open the health-check URL once and retry.

---

## 3. Features

### Public Website

- **Home** — positioning, the problem InstaBizWeb solves, all nine services, featured capabilities, differentiators, process and conversion CTA
- **About** — InstaBizWeb as a technology and digital solutions partner
- **Services** — all nine services grouped into four outcomes
- **Why Choose Us** — the six advantages from the brief, expanded
- **Contact / Enquiry** — a working form with client *and* server validation
- Responsive from 360 px upward, with mobile layouts designed rather than shrunk
- Accessible: semantic headings, labelled inputs, visible focus rings, keyboard navigation, `prefers-reduced-motion` respected
- SEO: per-page titles and descriptions, Open Graph metadata, canonical URLs, favicon

### Admin Panel

- Email + password login; the dashboard is unreachable without a valid token
- Enquiry table: **Name, Email, Phone, Company, Service, Date, Actions**
- Full CRUD — view list, view details, edit, update, delete
- Delete guarded by a confirmation dialog
- **Optional extras from the brief, all implemented:** search, service and status filters, pagination, and enquiry status (`Pending` / `Contacted` / `Resolved`)
- Loading skeletons, empty, no-results and error states
- Table becomes a card list on mobile instead of scrolling sideways

---

## 4. Tech Stack

### Frontend

| Icon | Technology | Version | Purpose |
|:----:|-----------|---------|---------|
| <img src="https://cdn.simpleicons.org/nextdotjs/000000" width="18" /> | **Next.js** | 15.5 | App Router, server components, routing |
| <img src="https://cdn.simpleicons.org/react/61DAFB" width="18" /> | **React** | 19 | UI library |
| <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" width="18" /> | **Tailwind CSS** | v4 | CSS-first design tokens via `@theme` |
| <img src="https://cdn.simpleicons.org/reacthookform/EC5990" width="18" /> | **React Hook Form** | 7 | Enquiry form state and validation |
| <img src="https://cdn.simpleicons.org/lucide/F56565" width="18" /> | **Lucide React** | latest | Single consistent icon set |

### Backend

| Icon | Technology | Version | Purpose |
|:----:|-----------|---------|---------|
| <img src="https://cdn.simpleicons.org/nodedotjs/5FA04E" width="18" /> | **Node.js** | 18+ | Runtime |
| <img src="https://cdn.simpleicons.org/express/000000" width="18" /> | **Express** | 5 | REST API framework |
| <img src="https://cdn.simpleicons.org/postgresql/4169E1" width="18" /> | **PostgreSQL** | 14+ | Relational database |
| <img src="https://cdn.simpleicons.org/jsonwebtokens/000000" width="18" /> | **jsonwebtoken** | 9 | Stateless admin sessions |
| 🔐 | **bcryptjs** | 3 | Password hashing (cost factor 12) |
| <img src="https://cdn.simpleicons.org/dotenv/ECD53F" width="18" /> | **dotenv** | 17 | Environment configuration |
| 🐘 | **node-postgres (`pg`)** | 8 | Parameterised SQL client |

### Deliberate choices

- **No component library.** MUI was removed during development: it was used only by the contact form, which made the highest-value page on the site look unrelated to everything around it. The design system replaced it and removed ~90 KB from the bundle.
- **No animation library.** Scroll reveals use one `IntersectionObserver` and CSS transitions. The site is fully readable with JavaScript disabled and completely still under `prefers-reduced-motion`.
- **Express kept separate from Next.js.** The brief specifies Node/Express REST APIs, so the API is its own deployable service rather than Next route handlers.

---

## 5. Architecture

### High-level

```
┌─────────────────────────────┐         ┌──────────────────────────────┐
│   FRONTEND — Next.js 15     │  HTTPS  │   BACKEND — Express 5        │
│                             │  JSON   │                              │
│  Public site  ·  /admin     │ ──────► │  Routes → Controllers        │
│  React 19 · Tailwind v4     │ ◄────── │  Middleware · Validators     │
└─────────────────────────────┘         └───────────────┬──────────────┘
                                                        │ pg (parameterised)
                                                        ▼
                                             ┌────────────────────────┐
                                             │  PostgreSQL            │
                                             │  admins · enquiries    │
                                             └────────────────────────┘
```

### MVC on the backend

The API follows a layered MVC structure. Each layer has exactly one job, so a change to validation never requires touching SQL, and a change to routing never requires touching business logic.

```
   REQUEST
      │
      ▼
┌──────────────────────────────────────────────────────────┐
│  ROUTES            src/routes/                           │
│  URL → controller mapping. Attaches auth middleware to   │
│  protected endpoints. No business logic.                 │
└──────────────────────────┬───────────────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────────┐
│  MIDDLEWARE        src/middleware/                       │
│  authMiddleware  — verifies the JWT, rejects with 401    │
│  errorMiddleware — final error handler                   │
└──────────────────────────┬───────────────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────────┐
│  VALIDATORS        src/validators/                       │
│  Trims and type-checks input, enforces the service and   │
│  status whitelists, returns a sanitised payload.         │
└──────────────────────────┬───────────────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────────┐
│  CONTROLLERS       src/controllers/   ← the "C" in MVC   │
│  Orchestrates: validate → query → shape the response     │
│  and the HTTP status code.                               │
└──────────────────────────┬───────────────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────────┐
│  MODEL / DATA      db/db.js + db/migrations/             │
│  Pooled pg client. Schema lives in versioned SQL files.  │
│  Every query is parameterised.                           │
└──────────────────────────┬───────────────────────────────┘
                           ▼
                     PostgreSQL
```

**Where the "View" lives.** In a classic server-rendered MVC app the view is a template. Here the API is headless and returns JSON only — the view layer is the Next.js frontend, which consumes that JSON. This separation is what allows the same API to serve the public site and the admin panel without duplication.

### Frontend layering

```
app/                 Routes and page composition (App Router)
  └── layout.js      Fonts, metadata, providers
components/
  ├── ui/            Primitives: Button, Field, Section, Icon, Reveal
  ├── layout/        Navbar, Footer, LayoutShell, Logo
  ├── sections/      Home page sections
  ├── visuals/       SVG diagrams and product mockups
  ├── forms/         EnquiryForm
  └── admin/         Admin shell, table, dialogs, states
lib/                 API client, service catalogue, helpers
context/             AuthContext — token and admin session
```

---

## 6. Application Flow

### Enquiry submission

```mermaid
flowchart TD
    A[Visitor opens /contact] --> B[Fills the enquiry form]
    B --> C{Client validation<br/>React Hook Form}
    C -- invalid --> D[Inline field errors<br/>nothing sent]
    D --> B
    C -- valid --> E[POST /api/enquiries]
    E --> F{Server validation<br/>enquiryValidator}
    F -- invalid --> G[400 + error list]
    G --> H[Errors shown on the form]
    F -- valid --> I[INSERT into enquiries<br/>status forced to Pending]
    I --> J[201 Created]
    J --> K[Success state:<br/>Thanks — your enquiry has been received]
    I --> L[(PostgreSQL)]
```

### Admin authentication

```mermaid
flowchart TD
    A[Visit /admin] --> B[Login screen]
    B --> C[POST /api/auth/login]
    C --> D{Admin email exists?}
    D -- no --> E[401 Invalid email or password]
    D -- yes --> F{bcrypt.compare<br/>password vs hash}
    F -- no match --> E
    F -- match --> G[Sign JWT · 1 day expiry]
    G --> H[Token stored in AuthContext]
    H --> I[Redirect to /admin/dashboard]
    I --> J[GET /api/enquiries<br/>Authorization: Bearer token]
    J --> K{authMiddleware<br/>verifies token}
    K -- invalid/expired --> L[401 → sign out → /admin]
    K -- valid --> M[Enquiry list rendered]
```

### Admin CRUD

```mermaid
flowchart LR
    A[Dashboard] --> B[View list<br/>GET /api/enquiries]
    A --> C[View details<br/>GET /api/enquiries/:id]
    A --> D[Edit<br/>PUT /api/enquiries/:id]
    A --> E[Delete<br/>DELETE /api/enquiries/:id]
    C --> F[Detail dialog]
    D --> G{Validation}
    G -- fails --> H[Field errors in dialog]
    G -- passes --> I[Row updated<br/>updated_at refreshed]
    E --> J[Confirmation dialog]
    J -- confirmed --> K[Row removed]
    I --> L[(PostgreSQL)]
    K --> L
```

---

## 7. Project Structure

```
instabizweb/
│
├── backend/                          Express REST API
│   ├── db/
│   │   ├── db.js                     Pooled pg client (SSL in production)
│   │   └── migrations/
│   │       ├── 001_initial.sql       admins + enquiries tables
│   │       └── 002_add_enquiry_status.sql
│   ├── scripts/
│   │   ├── migrate.js                Applies every .sql file in order
│   │   └── seed-admin.js             Creates the first admin from .env
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js     Login, bcrypt compare, JWT signing
│   │   │   └── enquiryController.js  Enquiry CRUD
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js     Bearer token verification
│   │   │   └── errorMiddleware.js    Central error handler
│   │   ├── routes/
│   │   │   ├── authRoutes.js         /api/auth
│   │   │   └── enquiryRoutes.js      /api/enquiries
│   │   ├── validators/
│   │   │   └── enquiryValidator.js   Server-side rules + whitelists
│   │   ├── app.js                    Express app, CORS, health check
│   │   └── server.js                 Entry point
│   ├── .env                          Not committed
│   └── package.json
│
├── frontend/                         Next.js application
│   ├── app/
│   │   ├── layout.js                 Root layout, fonts, SEO metadata
│   │   ├── globals.css               Design system tokens (@theme)
│   │   ├── icon.svg                  Favicon
│   │   ├── page.js                   Home
│   │   ├── about/page.js
│   │   ├── services/page.js
│   │   ├── why-choose-us/page.js
│   │   ├── contact/page.js           Enquiry form page
│   │   └── admin/
│   │       ├── layout.js             noindex metadata
│   │       ├── page.js               Admin login
│   │       └── dashboard/page.js     Protected dashboard
│   ├── components/
│   │   ├── ui/                       Button · Field · Section · Icon · Reveal
│   │   ├── layout/                   Navbar · Footer · LayoutShell · Logo
│   │   ├── sections/                 Hero · ProblemSolution · ServiceStack ·
│   │   │                             FeaturedCapabilities · WhyUs · Process ·
│   │   │                             AboutTeaser · CTASection
│   │   ├── visuals/                  EcosystemDiagram · Mockups
│   │   ├── forms/                    EnquiryForm
│   │   └── admin/                    AdminShell · Toolbar · EnquiryTable ·
│   │                                 EnquiryDialogs · Pagination · States ·
│   │                                 StatusBadge · Modal
│   ├── context/
│   │   └── AuthContext.js            Token + admin session
│   ├── lib/
│   │   ├── api.js                    Typed API client
│   │   ├── services.js               Service catalogue (single source of truth)
│   │   ├── adminConstants.js         Status list, page size, pagination range
│   │   ├── site.js                   Company contact details
│   │   └── cn.js                     Class-name joiner
│   ├── .env.local                    Not committed
│   └── package.json
│
└── README.md
```

---

## 8. Database Schema

### `admins`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | `SERIAL` | PRIMARY KEY |
| `name` | `VARCHAR(100)` | NOT NULL |
| `email` | `VARCHAR(255)` | NOT NULL, **UNIQUE** |
| `password_hash` | `VARCHAR(255)` | NOT NULL — bcrypt, cost 12 |
| `created_at` | `TIMESTAMP` | NOT NULL, DEFAULT `CURRENT_TIMESTAMP` |
| `updated_at` | `TIMESTAMP` | NOT NULL, DEFAULT `CURRENT_TIMESTAMP` |

> Plain-text passwords are never stored or logged. Only `password_hash` is persisted, and it is never returned by any endpoint.

### `enquiries`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | `SERIAL` | PRIMARY KEY |
| `full_name` | `VARCHAR(100)` | NOT NULL |
| `email` | `VARCHAR(255)` | NOT NULL |
| `phone` | `VARCHAR(30)` | NOT NULL |
| `company_name` | `VARCHAR(150)` | NOT NULL |
| `service` | `VARCHAR(100)` | NOT NULL — whitelisted server-side |
| `message` | `TEXT` | NOT NULL |
| `status` | `VARCHAR(20)` | NOT NULL, DEFAULT `'Pending'` |
| `created_at` | `TIMESTAMP` | NOT NULL, DEFAULT `CURRENT_TIMESTAMP` |
| `updated_at` | `TIMESTAMP` | NOT NULL, DEFAULT `CURRENT_TIMESTAMP` |

**Allowed `service` values** — enforced by the server, not just the dropdown:

`Website Development` · `Web/Mobile App Development` · `CRM` · `ERP/Odoo` · `Custom Software` · `Business Automation` · `AI Automation` · `API Integration` · `Digital Marketing` · `Other`

**Allowed `status` values:** `Pending` · `Contacted` · `Resolved`

---

## 9. API Endpoints

Base URL: `https://instabizweb.onrender.com`

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/api/auth/login` | — | Admin login, returns a JWT |

<details>
<summary><b>Request / response</b></summary>

```jsonc
// POST /api/auth/login
{ "email": "admin@example.com", "password": "your-password" }

// 200 OK
{
  "success": true,
  "message": "Login successful",
  "admin": { "id": 1, "name": "Admin", "email": "admin@example.com" },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}

// 401 Unauthorized — identical for unknown email and wrong password,
// so the response cannot be used to enumerate valid accounts
{ "success": false, "message": "Invalid email or password" }
```
</details>

### Enquiries

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/api/enquiries` | Public | Create an enquiry (the website form) |
| `GET` | `/api/enquiries` | **JWT** | List all enquiries, newest first |
| `GET` | `/api/enquiries/:id` | **JWT** | Get one enquiry |
| `PUT` | `/api/enquiries/:id` | **JWT** | Update an enquiry |
| `DELETE` | `/api/enquiries/:id` | **JWT** | Delete an enquiry |
| `GET` | `/api/health` | Public | API + database connectivity check |

<details>
<summary><b>Create an enquiry</b></summary>

```jsonc
// POST /api/enquiries
{
  "fullName": "Jane Mehta",
  "email": "jane@company.com",
  "phone": "9876543210",
  "companyName": "Acme Manufacturing",
  "service": "AI Automation",
  "message": "We want to automate our order intake."
}

// 201 Created
{
  "success": true,
  "message": "Enquiry submitted successfully",
  "enquiry": { "id": 12, "fullName": "Jane Mehta", "status": "Pending", "...": "..." }
}

// 400 Bad Request
{
  "success": false,
  "message": "Validation failed",
  "errors": ["Invalid email format.", "Company name is required."]
}
```

Any `status` sent by a client on create is stripped — new enquiries are always `Pending`.
</details>

<details>
<summary><b>Protected requests</b></summary>

```bash
Authorization: Bearer <token>
```

Missing, malformed or expired tokens all return:

```jsonc
{ "success": false, "message": "Unauthorized" }   // 401
```
</details>

### Status codes

| Code | Meaning |
|------|---------|
| `200` | Request succeeded |
| `201` | Enquiry created |
| `400` | Validation failed or malformed ID |
| `401` | Missing, invalid or expired token / bad credentials |
| `404` | Enquiry does not exist |
| `500` | Server or database error |

---

## 10. Environment Variables

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

> Both `.env` files are listed in `.gitignore` and are not committed. Only `NEXT_PUBLIC_*` variables reach the browser; no secret is ever exposed to frontend code.

---

## 11. Local Setup

### Prerequisites

- **Node.js** 18 or newer
- **PostgreSQL** 14 or newer, running locally or reachable by URL
- **npm**

### 1 — Clone

```bash
git clone https://github.com/homasvikaneria/InstaBizWeb.git
cd InstaBizWeb
```

### 2 — Backend

```bash
cd backend
npm install
```

Create `backend/.env` using the template in [section 10](#10-environment-variables), then:

```bash
node scripts/migrate.js      # create the tables
node scripts/seed-admin.js   # create the first admin
npm run dev                  # http://localhost:5000
```

Confirm it is alive:

```bash
curl http://localhost:5000/api/health
# {"status":"ok","message":"InstaBizWeb API and database are running","database":"connected"}
```

### 3 — Frontend

In a second terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env.local`, then:

```bash
npm run dev                  # http://localhost:3000
```

### 4 — Open

| Page | URL |
|------|-----|
| Website | http://localhost:3000 |
| Enquiry form | http://localhost:3000/contact |
| Admin login | http://localhost:3000/admin |

> **Note:** do not run `npm run build` while `npm run dev` is running in the same folder — both write to `.next`, and the production output will break the dev server's asset paths. Stop the dev server first, or delete `.next` and restart it.

### Available scripts

| Location | Command | Description |
|----------|---------|-------------|
| `backend` | `npm run dev` | Start the API |
| `backend` | `npm start` | Start the API (production) |
| `backend` | `node scripts/migrate.js` | Apply migrations |
| `backend` | `node scripts/seed-admin.js` | Seed the first admin |
| `frontend` | `npm run dev` | Next.js dev server |
| `frontend` | `npm run build` | Production build |
| `frontend` | `npm start` | Serve the production build |

---

## 12. Database & Admin Setup

### Creating the database

```sql
CREATE DATABASE instabizweb;
```

Point `DATABASE_URL` at it, then run the migration script. Migrations apply in filename order and skip tables that already exist, so re-running is safe.

### Creating an admin

`seed-admin.js` reads `ADMIN_NAME`, `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env`, hashes the password with bcrypt at cost 12, and inserts the row. The plain-text password is never written to the database.

```bash
node scripts/seed-admin.js
```

To add another admin later, change the three `ADMIN_*` values and run the script again. `email` is `UNIQUE`, so re-running with an existing email fails rather than creating a duplicate.

---

## 13. Deployment

The three pieces deploy independently. This project is currently deployed as:

| Piece | Platform | URL |
|-------|----------|-----|
| Frontend | **AWS Amplify** | https://main.dkissz3r2xx4g.amplifyapp.com |
| Backend API | **Render** | https://instabizweb.onrender.com |
| Database | **Managed PostgreSQL** | Private — reached via `DATABASE_URL` |

### Database

Provision a managed PostgreSQL instance, then run the migration and seed scripts once against it with `DATABASE_URL` pointing at the remote database. Set `DATABASE_SSL=true` — `db.js` enables SSL automatically when `NODE_ENV=production` or `DATABASE_SSL=true`.

### Backend

| Setting | Value |
|---------|-------|
| Root directory | `backend` |
| Build command | `npm install` |
| Start command | `npm start` |

Environment variables to set: `DATABASE_URL`, `DATABASE_SSL=true`, `JWT_SECRET`, `CORS_ORIGIN` (the deployed frontend URL), `NODE_ENV=production`.

### Frontend

| Setting | Value |
|---------|-------|
| Root directory | `frontend` |
| Build command | `npm run build` |
| Start command | `npm start` |

Environment variables to set: `NEXT_PUBLIC_API_URL` (the deployed backend URL) and `NEXT_PUBLIC_SITE_URL` (the deployed frontend URL).

### Deployment checklist

- [ ] Migrations applied against the production database
- [ ] Admin seeded, using a password that is not the local one
- [ ] `JWT_SECRET` is a long random value, different from development
- [ ] `CORS_ORIGIN` matches the deployed frontend origin exactly — a mismatch blocks every browser request
- [ ] `NEXT_PUBLIC_API_URL` points at the deployed backend, not `localhost`
- [ ] `/api/health` returns `database: connected`
- [ ] An enquiry submitted on the live site appears in the live admin panel

---

## 14. Testing

The full path was exercised against the live database rather than mocked.

### Enquiry API

| Case | Expected | Result |
|------|----------|:------:|
| Valid enquiry | `201`, row persisted | ✅ |
| Invalid email, phone, blank company, unknown service | `400` with per-field errors | ✅ |
| Client sends `"status": "Resolved"` on create | Forced to `Pending` | ✅ |
| `GET /api/enquiries` without a token | `401 Unauthorized` | ✅ |

### Authentication

| Case | Expected | Result |
|------|----------|:------:|
| Correct credentials | `200` + JWT | ✅ |
| Wrong password | `401 Invalid email or password` | ✅ |
| Tampered token | `401 Unauthorized` | ✅ |

### CRUD cycle

| Step | Expected | Result |
|------|----------|:------:|
| Create → read → update → delete | Each succeeds in order | ✅ |
| Row inspected directly in PostgreSQL after update | `updated_at > created_at` | ✅ |
| Invalid update payload | `400` with six field errors | ✅ |
| Fetch a deleted enquiry | `404 Enquiry not found` | ✅ |

### Manual checks

- All public routes return `200` with correct per-page titles
- The service dropdown renders exactly the ten values the brief specifies
- Keyboard-only navigation reaches every control, with a visible focus ring
- Layouts verified at 375 px, 768 px, 1024 px and 1440 px

### Live production verification

The same pipeline was re-run against the deployed environment — Amplify frontend, Render API, managed PostgreSQL — not only against localhost.

| Check | Expected | Result |
|-------|----------|:------:|
| `GET /api/health` on Render | `database: connected` | ✅ |
| Live site serves the current build | Home and `/admin` return `200` | ✅ |
| CORS preflight from the Amplify origin | Allowed for that origin specifically, not `*` | ✅ |
| Admin login against the live API | `200` + JWT issued | ✅ |
| Enquiry submitted to the live API | `201`, stored with status `Pending` | ✅ |
| Enquiry visible in the live admin list | Present in `GET /api/enquiries` | ✅ |
| Update on the live record | Status changed to `Contacted` | ✅ |
| Delete on the live record | Removed; subsequent fetch returns `404` | ✅ |

The verification record was deleted afterwards, leaving the production data unchanged.

---

## 15. Security Notes

| Concern | Handling |
|---------|----------|
| Password storage | bcrypt, cost factor 12. Plain text is never stored, logged or returned. |
| Session handling | Signed JWT with a 1-day expiry; the secret lives only in the backend environment. |
| Route protection | Every enquiry endpoint except `POST` requires a valid Bearer token; the dashboard redirects to the login screen without one. |
| SQL injection | Every query is parameterised through `pg`. No string interpolation touches SQL. |
| Input validation | Enforced server-side. Client validation is a convenience, never the control — the API rejects invalid payloads regardless of what the browser sent. |
| Privilege escalation | `status` supplied by a client on public create is stripped, so a visitor cannot self-mark an enquiry as resolved. |
| Account enumeration | Unknown email and wrong password return the identical `401`. |
| Secrets | Kept in `.env` files that are gitignored. Only `NEXT_PUBLIC_*` variables are exposed to the browser. |
| Crawler exposure | Admin routes are marked `noindex, nofollow`. |
| CORS | Restricted to a single configured origin rather than a wildcard. |

---

## 16. AI-Assisted Development

The brief encourages AI assistance and requires it to be documented. This section records what was used, where, and what still had to be corrected by hand.

### Tools used

| Tool | Where it was used |
|------|-------------------|
| **Claude (Anthropic)** | Primary assistant — design system, UI components, page composition, admin panel decomposition, README |
| **ChatGPT** | Occasional second opinion on wording and SQL |

### What was AI-assisted

- Design-system tokens in `globals.css` and the shared `components/ui` primitives
- Home page section components and the inline SVG diagrams
- Decomposing the admin dashboard from one large file into focused components
- Boilerplate: controllers, validators, API client functions
- Drafting this README

### What was written or decided manually

- The database schema and migration files
- Backend architecture — the routes → middleware → validators → controllers layering
- Which of the optional features to build (search, filters, pagination, status)
- All content and copy decisions, including the choice not to invent clients, testimonials or statistics
- Every environment and deployment configuration

### Reviewed rather than accepted

AI output was treated as a draft. Everything was read before being committed, and several suggestions were rejected — including a proposal to move the API into Next.js route handlers, which was declined because the brief specifies Node/Express, and a suggestion to add Framer Motion, which was declined because CSS transitions and a single `IntersectionObserver` achieve the same result without a 50 KB dependency.

### Example: AI-generated code that had to be debugged and fixed

**The problem.** Several data files reference icons by name, so the generated components resolved them dynamically:

```js
import * as Icons from 'lucide-react';

function Icon({ name, className }) {
  const Cmp = Icons[name] || Icons.Circle;
  return <Cmp className={className} aria-hidden="true" />;
}
```

This is correct JavaScript and renders perfectly, which is exactly why it survived review. The build output is what exposed it:

```
Route (app)                Size     First Load JS
┌ ○ /                      214 kB          320 kB
```

**The diagnosis.** `import * as Icons` is a namespace import. Because `Icons[name]` is computed at runtime, a bundler cannot prove which icons are unused, so tree-shaking is disabled and **the entire Lucide library** is pulled into the client bundle. The component that used it was a client component, so all of it shipped to the browser.

**The fix.** An explicit registry naming only the icons actually rendered, in `components/ui/Icon.js`:

```js
import { Blocks, Globe, Smartphone, Code2, /* …17 total… */ Circle } from 'lucide-react';

const REGISTRY = { Blocks, Globe, Smartphone, Code2, /* … */ };

export default function Icon({ name, className }) {
  const Cmp = REGISTRY[name] || Circle;
  return <Cmp className={className} aria-hidden="true" />;
}
```

The dynamic lookup still works for the data files, but the imports are now statically analysable.

**The result:**

```
Route (app)                Size     First Load JS
┌ ○ /                      6.09 kB         113 kB
```

Home page first-load JavaScript fell from **320 kB to 113 kB** — a 65% reduction — with no change in behaviour or appearance.

**The lesson.** AI-generated code that works is not the same as AI-generated code that is correct. This bug was invisible in the browser and only appeared in the build report, which is why the build output was checked rather than assumed.

---

<div align="center">

**InstaBizWeb** — Digital Solutions for Business Growth

Built by [Homasvi Kaneria](https://github.com/homasvikaneria)

</div>
