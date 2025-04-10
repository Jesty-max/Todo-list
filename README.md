# Todo List Application

A modern, responsive Todo List application built with Node.js, Express, and vanilla JavaScript.

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Filter tasks by status (All, Active, Completed)
- Responsive design for mobile and desktop
- Data persistence using JSON file storage
- Modern UI with animations and transitions

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd todo-list
```

2. Install dependencies:

```bash
npm install
```

## Running the Application

1. Start the server:

```bash
npm start
```

2. Open your browser and navigate to:

```
http://localhost:3000
```

## Development

To run the server in development mode with auto-reload:

```bash
npm run dev
```

## Project Structure

```
todo-list/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── data/
│   └── tasks.json
├── server.js
├── package.json
└── README.md
```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Technologies Used

- Backend:

  - Node.js
  - Express.js
  - File System (FS) for data persistence

- Frontend:
  - HTML5
  - CSS3
  - Vanilla JavaScript
  - Font Awesome icons

## License

MIT
