# EcoLearn Frontend

Modern educational web application for Arabic-speaking children (ages 9-12) focused on environmental education.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running (see backend README)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For production, set this in Vercel dashboard.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Deployment on Vercel

1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Add environment variable: `NEXT_PUBLIC_API_URL` pointing to your backend API
4. Deploy!

The project is configured for automatic deployments on push to main branch.

## Features

- 🎨 Child-friendly Arabic RTL interface
- 📚 Curriculum-based courses (Year 5 & 6)
- 🎬 Educational videos
- ✏️ Interactive exercises
- 🎮 Playable games
- 🏆 Gamification (points, badges, levels)
- 👥 Multi-role support (Student, Teacher, Parent)

## License

MIT
