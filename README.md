# 🧩 PuzzleLab

**PuzzleLab** is a collection of logic-based puzzle games built with modern web technologies. It serves as an interactive playground for experimenting with intuitive game mechanics, clean state architecture, and polished UI design — all within a modular, extensible platform.

## 🛠️ Tech Stack

- **React + TypeScript** – Modern UI development with type safety
- **Vite** – Lightning-fast development server and build tool
- **XState** – Robust state machines to manage game and puzzle logic
- **Tailwind CSS** – Utility-first styling for responsive, accessible design
- **Framer Motion** – Smooth animations and transitions

## 🚀 Features

- A growing set of unique puzzle games under one unified platform
- State-driven game logic (idle → playing → win/loss → reset)
- Modular architecture for adding new puzzles easily
- Responsive layout with clean visual feedback
- Animations for game transitions, feedback, and interactions
- Designed for accessibility, clarity, and fun

## 🎮 Games (Examples)

- **Toggle Puzzle** – Flip tiles to match a target pattern with limited moves
- **Path Builder** – Create a valid route from start to goal under constraints
- **Resource Logic** – Distribute limited actions to achieve multiple objectives

*More puzzle types coming soon!*

## 📦 Getting Started

```bash
# Clone the repo
git clone https://github.com/reecedoza/puzzle-lab
cd puzzle-lab

# Install dependencies
npm install

# Run the development server
npm run dev
```

Then open your browser to [http://localhost:5173](http://localhost:5173).

## 📁 Project Structure

```
src/
├── components/       # Shared UI components
├── games/            # Individual puzzle game logic/views
├── machines/         # XState state machines
├── pages/            # Home, GameSelector, etc.
├── App.tsx
├── main.tsx
└── index.css         # Tailwind CSS entry point
```

## 🌱 Future Enhancements

- In-app level editor for custom puzzles
- AI-powered puzzle generation and hint system
- Game scoring, progress tracking, and difficulty settings
- Mobile optimization and accessibility features

## 📜 License

MIT – fork it, build on it, and share it freely.

---

Created with ❤️ by Reece
