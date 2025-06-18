# 📝 NoteNest – A Full-Stack Note-Taking App
Added notes and Build more Productivity

## 🔧 Tech Stack
- Next.js (App Router)
- PostgreSQL + Prisma ORM
- Tailwind CSS + shadcn/ui
- Auth.js for authentication
- Deployed on Vercel

### 1. **Authentication**

- Users must be able to:
    - ~~Register an account~~
    - L~~og in securely~~
    - Log out
- Protected routes: Only authenticated users can view and manage their notes.
- No public access to anyone else’s data.
- ~~Passwords must be hashed and stored securely.~~

   

### 2. **Dashboard / Home Page**

- After logging in, users land on a **dashboard** showing a list of their notes.
- The latest notes appear on top.
- Each note should display:
    - Title
    - A snippet of content
    - Last updated time

### 3. **Creating a New Note**

- From the dashboard, users should be able to click "New Note".
- It opens a fullscreen or modal editor with:
    - **Title input**
    - **Content textarea** or Markdown editor
- A note can be saved manually or autosaved every X seconds.

### 4. **Editing a Note**

- Clicking on any note from the dashboard should navigate to an **edit page**.
- Edits should update the `updatedAt` timestamp.
- UI should show clear “saving...” feedback or toast confirmation.

### 5. **Deleting Notes**

- Each note should have a delete button.
- Deletion should:
    - Prompt for confirmation (modal)
    - Be irreversible
    - Remove the note from the DB and frontend cache immediately

### 6. **Search Functionality**

- Users can search through notes by:
    - Title
    - Content (full-text)
- Real-time filtering or fuzzy search preferred.

### 7. **Responsive UI**

- App must work beautifully on:
    - Desktop (large screens)
    - Tablets
    - Phones (fully mobile-friendly)
