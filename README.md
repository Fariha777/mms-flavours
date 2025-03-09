# MMS Flavours - Restaurant Management System

A modern restaurant management system built with Next.js, featuring online reservations, menu management, and admin dashboard.

## Features

- 🍽️ Online Table Reservations
- 💳 bKash Payment Integration
- 👤 User Authentication
- 📱 Responsive Design
- 🎨 Modern UI with Tailwind CSS
- 📊 Admin Dashboard
- 🗺️ Interactive Location Map
- 📝 Menu Management
- 🔒 Secure Authentication with NextAuth.js
- 📱 Mobile-Friendly Interface

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- MongoDB
- Git

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/mms-flavours.git
cd mms-flavours
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Seed the database with initial data:

```bash
npm run seed
# or
yarn seed
```

## Running the Project

1. Start the development server:

```bash
npm run dev
# or
yarn dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access

To access the admin dashboard:

1. Create an account using the signup form
2. Use MongoDB Compass or Shell to update your user role:

```javascript
db.users.updateOne({ email: "your-email@example.com" }, { $set: { role: "admin" } });
```

## Project Structure

```
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # Reusable components
│   ├── lib/                 # Utility functions and database connection
│   └── types/              # TypeScript type definitions
├── public/                  # Static files
└── package.json            # Project dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run seed` - Seed the database with initial data
- `npm run lint` - Run ESLint

## Technologies Used

- Next.js 14
- React
- TypeScript
- MongoDB
- Tailwind CSS
- NextAuth.js
- React Leaflet
- Framer Motion
- HeadlessUI

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For support, email support@mmsflavours.com or create an issue in this repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
