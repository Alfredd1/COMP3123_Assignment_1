# Employee Management API

A small REST API for employees with user signup/login. Node.js + Express + MongoDB.

## Run it

```bash
npm install
npm run start        # or: npm run start:dev (auto-restart)
```

MongoDB must be running on `localhost:27017` (start it with `docker compose up -d mongo`).

Configuration lives in `config.env`:

```env
PORT=3001
DATABASE_LOCAL=mongodb://root:example@localhost:27017/assignment_1?authSource=admin
JWT_SECRET=your-secret
JWT_EXPIRES_IN=90d
```

Or run everything with Docker:

```bash
docker compose up --build
```

**Base URL:** `http://localhost:3001/api/v1`

All requests and responses are JSON.

---

## Endpoints

### Employees

| Method | Endpoint | What it does |
| --- | --- | --- |
| GET | `/api/v1/emp` | List all employees |
| POST | `/api/v1/emp` | Create an employee |
| GET | `/api/v1/emp/:id` | Get one employee |
| PUT | `/api/v1/emp/:id` | Update an employee |
| DELETE | `/api/v1/emp/:id` | Delete an employee |

### Users (auth)

| Method | Endpoint | What it does |
| --- | --- | --- |
| POST | `/api/v1/user/signup` | Create an account, returns a token |
| POST | `/api/v1/user/login` | Log in, returns a token |

**Rules:** `email` must be valid, `password` needs at least 8 characters.

**Possible errors:**

| Status | Message |
| --- | --- |
| `400` | `Please provide email and password!` |
| `401` | `Incorrect email or password` |

---
### Error format

Failures come back as:

```json
{ "status": "fail", "message": "Cast to ObjectId failed for value ..." }
```

Useful codes: `400` bad JSON or missing fields · `401` wrong credentials · `404` not found or invalid id · `204` deleted.
