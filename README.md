## About

This project is an MVP for a system that enables the design and management of organizational charts using React.js. It is built with Next.js, which powers both the frontend and backend functionalities.

## Demo Video

Watch the demo video to see the App in action.

https://www.loom.com/share/0fd836ad229944d4a36e3f883ac3c54e?sid=08e29359-ce6f-4c57-be00-00ad0673f861

## Getting Started

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/anajuliarauber/nala-app.git
    cd nala-app
    ```

2. Install dependencies:
    ```bash
    yarn
    ```

3. Add an environment file:
    ```bash
    cp .env.example .env
    ```

4. Create and seed the database with initial data:
   ```bash
   # Run database migrations
   yarn prisma migrate dev

   # Seed the database with initial data
   yarn seed
   ```

5. Run the development server: 
   ```bash
    yarn dev
   ```
  
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Technologies Used

- React
- Next.js
- SQLite
- Prisma
- Tailwind CSS
- TypeScript
- Radix UI
- React flow
