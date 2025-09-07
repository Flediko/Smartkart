# MERN E-Commerce Platform

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project features a modern, responsive design with complete user authentication, product management, shopping cart functionality, and admin dashboard.

## 🚀 Features

### Frontend (React)
- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Product Catalog**: Browse products with filtering, sorting, and search
- **Product Details**: Detailed product pages with reviews and ratings
- **Shopping Cart**: Add/remove items, quantity management
- **User Authentication**: Login, register, and profile management
- **Admin Dashboard**: Product management for administrators
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Backend (Node.js/Express)
- **RESTful API**: Well-structured API endpoints
- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Product Management**: CRUD operations for products
- **Shopping Cart**: Persistent cart functionality
- **User Management**: Profile updates and user administration
- **Data Validation**: Input validation and error handling
- **MongoDB Integration**: Mongoose ODM for database operations

### Database (MongoDB)
- **User Schema**: User profiles with authentication
- **Product Schema**: Products with categories, reviews, and ratings
- **Cart Schema**: Shopping cart with items and totals

## 🛠️ Tech Stack

- **Frontend**: React 18, Redux Toolkit, React Router, React Icons, React Toastify
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs
- **Styling**: CSS3 with custom utility classes
- **Development**: Concurrently for running both frontend and backend

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd mern-ecommerce
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
npm run install-server

# Install frontend dependencies
npm run install-client
```

### 3. Environment Setup
Create a `.env` file in the `backend` directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
JWT_EXPIRE=7d
```

### 4. Database Setup
Make sure MongoDB is running on your system. The application will automatically create the database and collections.

### 5. Seed the Database (Optional)
To populate the database with sample data:
```bash
cd backend
node seed.js
```

This will create:
- Sample products in various categories
- Admin user: `admin@example.com` / `admin123`
- Regular users: `john@example.com` / `password123`

### 6. Run the Application
```bash
# Run both frontend and backend concurrently
npm run dev

# Or run them separately:
# Backend only
npm run server

# Frontend only
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🎯 Usage

### Demo Credentials
- **Admin**: admin@example.com / admin123
- **User**: john@example.com / password123

### User Features
1. **Browse Products**: View all products with filtering and search
2. **Product Details**: Click on any product to see detailed information
3. **Add to Cart**: Add products to your shopping cart
4. **User Account**: Register, login, and manage your profile
5. **Reviews**: Add reviews and ratings for products

### Admin Features
1. **Product Management**: Add, edit, and delete products
2. **User Management**: View and manage user accounts
3. **Dashboard**: Overview of products and system status

## 📁 Project Structure

```
mern-ecommerce/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── server.js        # Express server setup
│   ├── seed.js          # Database seeding script
│   └── package.json
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── store/       # Redux store and slices
│   │   ├── utils/       # Utility functions
│   │   └── App.js       # Main App component
│   └── package.json
├── package.json         # Root package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `POST /api/products/:id/reviews` - Add product review

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Users
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/password` - Update password
- `GET /api/users` - Get all users (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

## 🎨 Customization

### Adding New Product Categories
1. Update the category enum in `backend/models/Product.js`
2. Add the new category to the frontend category filter in `frontend/src/pages/Products.js`

### Styling
The application uses custom CSS with utility classes. Main styles are in `frontend/src/index.css`. You can customize colors, fonts, and layout by modifying the CSS variables and utility classes.

### Adding New Features
1. **Backend**: Add new routes in the `backend/routes/` directory
2. **Frontend**: Create new components in `frontend/src/components/`
3. **State Management**: Add new Redux slices in `frontend/src/store/slices/`

## 🚀 Deployment

### Backend Deployment
1. Set up a MongoDB Atlas cluster or use a cloud MongoDB service
2. Update the `MONGODB_URI` in your environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy the `build` folder to platforms like Netlify, Vercel, or AWS S3

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRE=7d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in `.env`
   - Verify network connectivity

2. **Port Already in Use**
   - Change the PORT in `.env` file
   - Kill existing processes using the port

3. **CORS Issues**
   - Ensure the frontend URL is allowed in CORS settings
   - Check that the proxy is set correctly in `frontend/package.json`

4. **Authentication Issues**
   - Clear localStorage and try logging in again
   - Check JWT secret configuration
   - Verify token expiration settings

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information

---

**Happy Coding! 🎉**