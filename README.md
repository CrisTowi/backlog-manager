# Gaming Backlog Manager

A modern web application to track and manage your gaming backlog, helping you avoid spending money on games you won't play.

## Features

- **Kanban Board Interface**: Drag and drop games between status columns (Not Started, In Progress, Completed)
- **Game Management**: Add, edit, and delete games from your backlog
- **Status Tracking**: Track games as Not Started, In Progress, or Completed
- **Duplicate Detection**: Warns you when trying to add a game you already have
- **Price Tracking**: Keep track of how much you've spent on games
- **Filtering & Search**: Filter by status, platform, or search by name
- **Multi-platform Support**: Games can be marked as multi-platform or platform-agnostic
- **Dark Theme**: Toggle between light and dark themes with smooth transitions
- **Data Persistence**: All data is saved locally in your browser

## Getting Started

### Prerequisites

- Node.js 20+ and npm (or yarn/pnpm)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Deployment

### Netlify

This app is configured for deployment on Netlify:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Netlify
3. Netlify will automatically detect the Next.js configuration
4. The build will run automatically on each push

**Build Settings (auto-detected):**
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 20

The `netlify.toml` file is already configured with the necessary settings.

## Usage

1. **Add a Game**: 
   - Click the "Add Game" button in the header, or
   - Click "Add Game" in any kanban column to add a game with that status pre-selected
   - Title is required; platform is optional (for multi-platform games)

2. **Manage Games**: 
   - Drag and drop games between columns to change their status
   - Click the edit icon on any game card to modify notes
   - Delete games you no longer want to track

3. **Filter & Search**:
   - Use the search bar to find games by name or notes
   - Filter by status (Not Started, In Progress, Completed)
   - Filter by platform (or show all platforms)

4. **Theme Toggle**:
   - Click the theme toggle button in the header to switch between light and dark themes
   - Your preference is saved and will persist across sessions

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling with dark mode support
- **@dnd-kit** - Drag and drop functionality
- **Lucide React** - Icon library
- **LocalStorage** - Client-side data persistence

## Project Structure

```
BacklogManager/
├── app/
│   ├── layout.tsx      # Root layout with theme provider
│   ├── page.tsx         # Main page component
│   ├── globals.css      # Global styles
│   └── icon.svg         # Favicon
├── components/
│   ├── AddGameForm.tsx  # Form to add new games
│   ├── FilterBar.tsx    # Filtering controls
│   ├── KanbanBoard.tsx  # Main kanban board container
│   ├── KanbanColumn.tsx # Individual column component
│   ├── KanbanCard.tsx   # Draggable game card
│   ├── Modal.tsx        # Modal component
│   ├── ThemeToggle.tsx  # Theme toggle button
│   └── Providers.tsx    # Context providers wrapper
├── contexts/
│   └── ThemeContext.tsx # Theme context and provider
├── lib/
│   ├── storage.ts       # LocalStorage utilities
│   └── utils.ts         # Helper functions
├── types/
│   └── game.ts          # TypeScript type definitions
└── netlify.toml         # Netlify deployment configuration
```

## Future Enhancements

Potential features to consider:
- Export/import backlog data (JSON/CSV)
- Integration with gaming APIs (IGDB, Steam, etc.)
- Game recommendations based on backlog
- Completion time tracking
- Wishlist functionality
- Cloud sync across devices
- Game cover images

## License

MIT
