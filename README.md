# Network Frontend

A modern web application for managing professional connections and networking.

## Features

- User authentication (login/register)
- Profile management
- Connection requests
- Search for users
- Accept/reject connection requests
- View existing connections

## Technologies Used

- React 18
- React Router 6
- Axios for API calls
- Tailwind CSS for styling
- React Icons for icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd network-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add the following:
```
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── pages/         # Page components
  ├── utils/         # Utility functions
  ├── App.js         # Main application component
  ├── App.css        # Global styles
  └── index.js       # Entry point
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
