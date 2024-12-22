# ✈️ QuickFly- Next-Gen Flight Booking Platform
<img src="https://ik.imagekit.io/yogiefani/quickfly-horizontal.png?updatedAt=1734901604981" 
width="100%">
<div align="center">
<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=30&pause=1000&color=6C63FF&center=true&vCenter=true&random=false&width=435&lines=QuickFly+Frontend;Modern+Flight+Booking;React+%2B+Vite+%2B+Redux" alt="Typing SVG" />

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" alt="rainbow" width="100%">


</div>

## 🎯 Project Overview

<div align="center">
<img src="https://i.imgur.com/dBaSKWF.gif" height="20" width="100%">
</div>

A blazing-fast ⚡ flight booking SPA built with the latest frontend tech stack. Our platform delivers a pixel-perfect, responsive UI with buttery-smooth animations and state-of-the-art user experience.

## 🛠️ Tech Stack & Architecture



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


## 👨‍💻 Kelompok 12

<div align="center">

<img src="https://i.imgur.com/dBaSKWF.gif" height="20" width="100%">

| Avatar | Name | Role | GitHub |
|--------|------|------|--------|
| <img src="https://avatars.githubusercontent.com/u/108708078?v=4" width="50" height="50" style="border-radius:50%"> | **Rafly Aziz Abdillah** | Fullstack Web | [@rafly](https://github.com/raflytch) |
| <img src="https://avatars.githubusercontent.com/u/171102959?v=4" width="50" height="50" style="border-radius:50%"> | **Tegar Alfa Rizzi** | Fullstack Web | [@tegar](https://github.com/TegarAlfaR) |
| <img src="https://avatars.githubusercontent.com/u/127614248?v=4" width="50" height="50" style="border-radius:50%"> | **Melinda Wijaya** | Fullstack Web | [@melinda](https://github.com/melindawijaya) |
| <img src="https://avatars.githubusercontent.com/u/106648832?v=4" width="50" height="50" style="border-radius:50%"> | **Yogi Efani Yancandra** | Fullstack Web | [@yogi](https://github.com/yogiefani) |

</div>


</div>

## 🛠 Quick Setup

1. *Clone the Repository*
   bash
   git clone https://github.com/Final-Project-Team12/FE-FINAL_PROJECT-TEAM_12
   cd FE-FINAL_PROJECT-TEAM_12
   

2. *Install Dependencies*
   bash
   npm install
   

3. *Environment Setup*
   bash
   # Create .env file and add:
   VITE_BACKEND_URI=your_backend_url
   VITE_MIDTRANS_CLIENT_KEY=your_midtrans_key
   

4. *Launch Development Server*
   bash
   npm run dev
   
## 🔥 Features

- 🎫 *Smart Flight Search* - Advanced filtering and sorting
- 💳 *Secure Payments* - Integrated with trusted payment gateways
- 📱 *Responsive Design* - Seamless experience across all devices
- 🔐 *OTP Verification* - Enhanced security for users
- 📄 *E-Tickets* - Easy download and print options
- 📊 *Booking History* - Comprehensive order tracking
- 🔔 *Real-time Notifications* - Stay updated with your bookings
- 👤 *Profile Management* - Easy account management


## 📁 Project Architecture


src/
├── api/          # API configuration & instances
├── components/   # Reusable UI components
│   └── Elements/ # Atomic UI elements
├── contexts/     # React context providers
├── hooks/        # Custom React hooks
├── pages/        # Main application pages
├── services/     # API integration services
└── store/        # Redux state management


## 🛣 Route Map

| *Route*                          | *Page*          | *Protected* |
| ---------------------------------- | ----------------- | ------------- |
| /                                | Homepage          | No            |
| /login                           | LoginPage         | No            |
| /register                        | RegisterPage      | No            |
| /reset-password                  | ResetPasswordPage | No            |
| /otp                             | OtpPage           | No            |
| /otp-password                    | OtpPasswordPage   | No            |
| /flight-ticket                   | FlightTicketPage  | No            |
| /checkout/:departureId           | PaymentPage       | Yes           |
| /checkout/:departureId/:returnId | PaymentPage       | Yes           |
| /payment/:id                     | PaymentLastPage   | Yes           |
| /orderhistory                    | OrderHistoryPage  | Yes           |
| /print-ticket                    | PrintTicketPage   | Yes           |
| /notification                    | NotificationPage  | Yes           |
| /account/:id                     | AccountPage       | Yes           |
| *                                | NotFoundPage      | No            |



## 🔄 State Management

Our Redux store is organized into logical slices:

- 🔐 authReducer: Authentication state
- 👤 userReducer: User profile data
- 💳 paymentReducer: Payment processing
- ✈ flightReducer: Flight information
- 🔍 flightSearchReducer: Search parameters
- 📋 orderHistoryReducer: Booking history

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See LICENSE for more information.

## 📞 Contact

Frontend Team - [Track us on ClickUp](https://app.clickup.com/9018681465/v/b/8crwa3t-458)

---
<div align="center">
   <img src="https://ik.imagekit.io/yogiefani/ilustrasi%203.gif?updatedAt=1734903554569" >
</div>
<div align="center">
### 🚀 Made with caffeine and React by Frontend Kelompok 12

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer" width="100%"/>

![Visits](https://api.visitorbadge.io/api/visitors?path=airtix-frontend&label=repo%20views&labelColor=%23000000&countColor=%2337d67a)

</div>
