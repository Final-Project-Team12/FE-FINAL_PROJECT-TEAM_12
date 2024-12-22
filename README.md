# 🚀 Flight Booking System - Frontend

<div align="center">

![Flight Booking System](https://img.shields.io/badge/Project-Flight%20Booking-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Team Size](https://img.shields.io/badge/Team%20Size-4-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

## 🛫 About The Project

A modern flight booking system built with React and powered by cutting-edge technologies. Our platform provides a seamless experience for users to search, book, and manage their flight reservations.

## 👥 Dream Team

<div align="center">

| Role | Name |
|------|------|
| 👨‍💻 Frontend Developer | **Rafly Aziz Abdillah** |
| 👨‍💻 Frontend Developer | **Tegar Alfa Rizzi** |
| 👩‍💻 Frontend Developer | **Melinda Wijaya** |
| 👨‍💻 Frontend Developer | **Yogi Efani Yancandra** |

[📋 Track Our Progress on ClickUp](https://app.clickup.com/9018681465/v/b/8crwa3t-458)

</div>

## 🚀 Tech Arsenal

<div align="center">

### Core Technologies
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF?style=for-the-badge&logo=vite)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.4.0-764ABC?style=for-the-badge&logo=redux)

### Styling & UI
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.15-38B2AC?style=for-the-badge&logo=tailwind-css)
![Flowbite](https://img.shields.io/badge/Flowbite-2.5.2-FF69B4?style=for-the-badge)
![Headless UI](https://img.shields.io/badge/Headless_UI-2.2.0-66E3FF?style=for-the-badge)

### Development Tools
![ESLint](https://img.shields.io/badge/ESLint-9.13.0-4B32C3?style=for-the-badge&logo=eslint)
![Prettier](https://img.shields.io/badge/Prettier-3.3.3-F7B93E?style=for-the-badge&logo=prettier)

</div>

## 🔥 Features

- 🎫 **Smart Flight Search** - Advanced filtering and sorting
- 💳 **Secure Payments** - Integrated with trusted payment gateways
- 📱 **Responsive Design** - Seamless experience across all devices
- 🔐 **OTP Verification** - Enhanced security for users
- 📄 **E-Tickets** - Easy download and print options
- 📊 **Booking History** - Comprehensive order tracking
- 🔔 **Real-time Notifications** - Stay updated with your bookings
- 👤 **Profile Management** - Easy account management

## 🛠️ Quick Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Final-Project-Team12/FE-FINAL_PROJECT-TEAM_12
   cd FE-FINAL_PROJECT-TEAM_12
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Create .env file and add:
   VITE_BACKEND_URI=your_backend_url
   VITE_MIDTRANS_CLIENT_KEY=your_midtrans_key
   ```

4. **Launch Development Server**
   ```bash
   npm run dev
   ```

## 📁 Project Architecture

```
src/
├── api/          # API configuration & instances
├── components/   # Reusable UI components
│   └── Elements/ # Atomic UI elements
├── contexts/     # React context providers
├── hooks/        # Custom React hooks
├── pages/        # Main application pages
├── services/     # API integration services
└── store/        # Redux state management
```

## 🛣️ Route Map

| Path | Component | Access |
|------|-----------|--------|
| `/` | Homepage | 🌐 Public |
| `/login` | LoginPage | 🌐 Public |
| `/register` | RegisterPage | 🌐 Public |
| `/flight-ticket` | FlightTicketPage | 🌐 Public |
| `/checkout/:id` | PaymentPage | 🔒 Protected |
| `/orderhistory` | OrderHistoryPage | 🔒 Protected |
| `/account/:id` | AccountPage | 🔒 Protected |

## 🔄 State Management

Our Redux store is organized into logical slices:

- 🔐 `authReducer`: Authentication state
- 👤 `userReducer`: User profile data
- 💳 `paymentReducer`: Payment processing
- ✈️ `flightReducer`: Flight information
- 🔍 `flightSearchReducer`: Search parameters
- 📋 `orderHistoryReducer`: Booking history

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Frontend Team - [Track us on ClickUp](https://app.clickup.com/9018681465/v/b/8crwa3t-458)

---

<div align="center">

Made with ❤️ by the Frontend Dream Team

</div>
