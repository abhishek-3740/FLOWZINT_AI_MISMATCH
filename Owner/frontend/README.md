# Owner Frontend (FlowZint)

This is the React + Vite frontend for the Owner dashboard used in the hackathon project.

Quick start

1. From the `Owner/frontend` folder install and run:

```bash
npm install
npm run dev
```

Build

```bash
npm run build
```

Features added by the assistant
- Local persistence for inventory, orders, suppliers, notifications, and settings (localStorage).
- Toast system for inline notifications (`src/components/ui/Toast.jsx`).
- Mock auth and protected owner routes (`src/contexts/AuthContext.jsx`, `ProtectedRoute`).
- Supplier CRUD UI with persistence (`src/pages/dashboard/SuppliersPage.jsx`).
- CSV export/import for inventory and orders (`src/utils/csv.js`).
- Pagination for inventory and orders.
- Image upload mock (data-URL) for inventory add form.
- AI reorder simulation: Settings -> Run AI reorder simulation creates draft orders and a notification.

If you want me to continue adding features (undo, audit log, batch order actions, server sync), tell me which to prioritize.
# FlowZint Owner Frontend

React + Tailwind + GSAP frontend for the Owner side dashboard.

## Run Locally

1. Open terminal in this folder.
2. Install dependencies:

   npm install

3. Start dev server:

   npm run dev

4. Build for production check:

   npm run build

## Routes

- `/` landing page
- `/login` login page
- `/signup` signup page
- `/owner` owner dashboard
- `/owner/inventory` stock management
- `/owner/ai-chat` AI chat interface
- `/owner/profile` profile page
- `/owner/settings` settings page

## Notes

- Uses realistic dummy data in `src/data/mockData.js`.
- GSAP animations are embedded with fast durations (about 0.3s to 0.5s) in each page/component.