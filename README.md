

## Technologies Used

### Frontend
- **React**: Used for building the frontend user interface.
- **React RND**: Used for creating resizable and draggable components.
- **Redux Toolkit**: Used for state management.
- **React Toastify**: Used for displaying toast notifications.

## Setup Instructions

To run the application locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the frontend directory and run `npm install` to install frontend dependencies.
3. Navigate to the backend directory and run `npm install` to install backend dependencies.
4. Start the MongoDB server.
5. In the backend directory, create a `.env.production` file with the following environment variable:
   - `REACT_APP_BASE_URL=<backend url>`
6. Run `npm start` in both the frontend  directories to start the frontend server, respectively.
7. Access the application in your web browser at `http://localhost:3000`.

## API Endpoints

- **POST /add-user**: Endpoint for adding a new user and update.
- **GET /get-all-user**: Endpoint for retrieving all users.
