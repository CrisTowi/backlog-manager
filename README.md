# Gaming Backlog Manager

A modern web application to track and manage your gaming backlog, helping you avoid spending money on games you won't play.

## Features

- **Game Management**: Add, edit, and delete games from your backlog
- **Status Tracking**: Track games as Not Started, In Progress, Completed, or Abandoned
- **Duplicate Detection**: Warns you when trying to add a game you already have
- **Price Tracking**: Keep track of how much you've spent on games
- **Statistics Dashboard**: View comprehensive stats about your backlog
- **Filtering & Search**: Filter by status, platform, or search by name
- **Priority System**: Set priority levels (low, medium, high) for games
- **Notes**: Add notes to each game for reminders or thoughts
- **Data Persistence**: All data is saved locally in your browser

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

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

## Usage

1. **Add a Game**: Click the "Add Game" button and fill in the game details
   - Title and platform are required
   - Optionally add price, notes, and priority
   - The system will warn you if you try to add a duplicate

2. **Manage Games**: 
   - Click the edit icon on any game card to modify details
   - Use quick action buttons to mark games as completed or start playing
   - Delete games you no longer want to track

3. **Filter & Search**:
   - Use the search bar to find games by name or notes
   - Filter by status (Not Started, In Progress, etc.)
   - Filter by platform (PC, PlayStation, Xbox, etc.)

4. **View Statistics**:
   - Check the stats panel at the top to see:
     - Total games in backlog
     - Games by status
     - Total money spent
     - Estimated remaining value

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling
- **Lucide React** - Icon library
- **LocalStorage** - Client-side data persistence

## Project Structure

```
BacklogManager/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx         # Main page component
│   └── globals.css      # Global styles
├── components/
│   ├── AddGameForm.tsx  # Form to add new games
│   ├── FilterBar.tsx    # Filtering controls
│   ├── GameCard.tsx     # Individual game card
│   ├── GameList.tsx     # List of games
│   └── StatsPanel.tsx   # Statistics display
├── lib/
│   ├── storage.ts       # LocalStorage utilities
│   └── utils.ts         # Helper functions
└── types/
    └── game.ts          # TypeScript type definitions
```

## Future Enhancements

Potential features to consider:
- Export/import backlog data (JSON/CSV)
- Integration with gaming APIs (IGDB, Steam, etc.)
- Game recommendations based on backlog
- Completion time tracking
- Wishlist functionality
- Cloud sync across devices
- Dark/light theme toggle

## License

MIT

