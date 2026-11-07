🌾 Farmer Hub — Agriculture Management System

Farmer Hub is a React-based Agriculture Management System designed to help farmers manage crops, monitor weather conditions, organize harvest schedules, manage buyers, track orders, and monitor crop-wise financial performance through a responsive dashboard.

📌 Project Overview

Farmer Hub provides a centralized platform for managing essential farming activities. It combines weather monitoring, crop management, harvest planning, buyer records, order management, expense tracking, and profit/loss calculations to make agricultural operations more organized and convenient.

✨ Features

🌦️ Weather Management

- Live weather information using the Open-Meteo API.
- Five-day weather forecast.
- Weather alerts and humidity monitoring.
- Weather condition updates.

🌱 Crop Management

- Add, update, and manage crop information.
- Monitor crop health and status.
- Track crop conditions.
- Export crop data to CSV.

🚜 Harvest Management

- Manage harvest schedules.
- View harvest charts and summaries.
- Organize harvest-related information.

👨‍🌾 Buyer Management

- Manage buyer information.
- Organize buyer records.
- Keep buyer information accessible.

📦 Order Management

- Create and manage harvest orders.
- Update existing orders.
- Track order status (Pending, Delivered, and Cancelled).
- Record crop quantity and selling price per kilogram.
- Automatically calculate order revenue.
- Export order data to CSV.

💰 Expense Management

- Add and manage farming expenses.
- Categorize expenses such as Seeds, Fertilizer, Labor, Fuel, and Equipment.
- Associate expenses with specific crops.
- Track crop-wise expenses.

📊 Profit and Loss Management

- Calculate revenue from delivered orders.
- Calculate total expenses for each crop.
- Automatically calculate crop-wise profit or loss.
- Display Revenue, Total Cost, and Profit/Loss in the Dashboard.
- Update financial calculations using crop-wise order and expense records.

📈 Dashboard and Data Management

- Responsive dashboard interface.
- Centralized overview of farming activities.
- Crop-wise financial summary.
- Weather and crop monitoring.
- Redux Toolkit for application state management.
- Browser LocalStorage for supported application data persistence.

🛠️ Technologies Used

Technology| Purpose
React.js| Building the user interface
JavaScript| Application logic
Bootstrap| Responsive layout and styling
React Router| Navigation between pages
Redux Toolkit| Application state management
Chart.js| Data visualization and charts
Open-Meteo API| Weather information and forecasts
LocalStorage| Saving application data in the browser

⚙️ Installation and Setup

Follow these steps to run Farmer Hub on your local machine.

1. Clone the Repository

git clone YOUR_GITHUB_REPOSITORY_URL

2. Open the Project Folder

cd agri-management-system

3. Install Dependencies

npm install

4. Start the Development Server

npm start

5. Open in Your Browser

http://localhost:3000

🌤️ Weather API

Farmer Hub uses the Open-Meteo API to retrieve weather information and forecasts.

Official Website: https://open-meteo.com/

💾 Data Storage

The application uses browser LocalStorage to persist supported application data between browser sessions.

- Crops
- Buyers
- Harvest orders
- Expenses
- Other supported farming records

Data is stored locally in the browser and is not automatically synchronized across different devices.

📜 Available Scripts

Command| Description
"npm start"| Starts the development server
"npm test"| Runs the available tests
"npm run build"| Creates an optimized production build

📁 Project Information

- Project Name: Farmer Hub
- Project Type: Agriculture Management System
- Frontend: React.js
- Programming Language: JavaScript
- State Management: Redux Toolkit
- Weather Provider: Open-Meteo API
- Data Storage: Browser LocalStorage

🚀 Future Improvements

- User authentication and role-based access.
- Cloud database integration.
- Advanced crop analytics.
- Automated farming reminders.
- Enhanced reporting and data visualization.
- Multi-user data synchronization.

👩‍💻 Author

Developed as a React-based Agriculture Management System project.

---

Farmer Hub — Making Farm Management More Organized. 🌾