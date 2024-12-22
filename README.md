### **Frontend Team Documentation**

---

### **Website**



---

## **FRONTEND TEAM**

| **Name**                 |
| ------------------------ |
| **Rafly Aziz Abdillah**  |
| **Tegar Alfa Rizzi**     |
| **Melinda Wijaya**       |
| **Yogi Efani Yancandra** |

For tasks and progress, visit our ClickUp workspace: [ClickUp Tasks](https://app.clickup.com/9018681465/v/b/8crwa3t-458)

---

## **Project Setup**

Follow these steps to run the frontend project locally:

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/Final-Project-Team12/FE-FINAL_PROJECT-TEAM_12
   ```

2. Navigate to the project directory:

   ```bash
   cd FE-FINAL_PROJECT-TEAM_12
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables by creating a `.env` file in the root directory with the following content:

   ```env
   VITE_BACKEND_URI=
   VITE_MIDTRANS_CLIENT_KEY=
   ```

5. Run the application for local development:
   ```bash
   npm run dev
   ```

---

## **Folder Structure**

The project directory structure is organized as follows:

### **`/public`**

- **`/icons`**: Directory for storing icons.
- **`/images`**: Directory for storing images.

### **`/src`**

1. **`/api`**

   - Contains configuration files for the **Axios instance** used for API integration.
   - **Note**: All HTTP requests must use this instance for consistency.

2. **`/components`**

   - Stores all **UI components**.
   - **`/Elements`**: A sub-folder for smaller, reusable UI elements.

3. **`/hooks`**

   - Stores **custom hooks**.
   - **Note**: All custom hooks must begin with the prefix **`use`**, such as **`useForm`** or **`useFetch`**.

4. **`/contexts`**

   - Stores all **React Contexts** used in the application.

5. **`/pages`**

   - Contains the main pages of the application.

6. **`/services`**

   - Contains files for API integration with reusable functions.
   - All functions here should use the **Axios instance** from the **`/api`** folder to ensure consistent API requests.

7. **`/store`**
   - Contains all Redux setup files and slices for state management.
   - **Store Setup**:
     - The `store` is configured using `@reduxjs/toolkit`'s `configureStore` function.
     - Each slice represents a specific part of the application's state (e.g., `auth`, `user`, `flightSearch`, etc.).
     - Middleware is customized to handle serializable checks and date serialization/deserialization.
   - **Reducers**:
     - `authReducer`: Manages authentication state.
     - `userReducer`: Handles user profile and account management.
     - `paymentReducer`: Manages payment data and processes.
     - `flightReducer`: Stores selected flight data.
     - `flightSearchReducer`: Handles flight search parameters and results.
     - `flightFilterReducer`: Manages filters and sorting for flights.
     - `registerReducer`: Handles registration and OTP verification.
     - `resetPasswordReducer`: Manages password reset and OTP processes.
     - `orderHistoryReducer`: Manages user order history.
   - **Utilities**:
     - `resetStore`: Dispatches actions to reset all slices to their initial states.
     - `serializeDate` and `deserializeDate`: Functions to handle date conversion for Redux state.
   - **Middleware**:
     - Includes default middleware with custom configurations for serializable checks, such as ignoring specific paths and actions.

---

## **Routes**

The application has the following routes:

| **Route**                          | **Page**          | **Protected** |
| ---------------------------------- | ----------------- | ------------- |
| `/`                                | Homepage          | No            |
| `/login`                           | LoginPage         | No            |
| `/register`                        | RegisterPage      | No            |
| `/reset-password`                  | ResetPasswordPage | No            |
| `/otp`                             | OtpPage           | No            |
| `/otp-password`                    | OtpPasswordPage   | No            |
| `/flight-ticket`                   | FlightTicketPage  | No            |
| `/checkout/:departureId`           | PaymentPage       | Yes           |
| `/checkout/:departureId/:returnId` | PaymentPage       | Yes           |
| `/payment/:id`                     | PaymentLastPage   | Yes           |
| `/orderhistory`                    | OrderHistoryPage  | Yes           |
| `/print-ticket`                    | PrintTicketPage   | Yes           |
| `/notification`                    | NotificationPage  | Yes           |
| `/account/:id`                     | AccountPage       | Yes           |
| `*`                                | NotFoundPage      | No            |

---

## **Features**

The following features are available or planned for the application:

1. **Homepage**: Displays an overview of the service.
2. **Login and Registration**: Authentication system for users.
3. **Flight Ticket Search**: Allows users to search for flights.
4. **Checkout**: Handles the booking process with payment integration.
5. **Order History**: Shows the history of user bookings.
6. **Notifications**: Displays user notifications for updates and alerts.
7. **Account Management**: Users can update their profile and view details.
8. **OTP Verification**: Ensures secure access to certain features.
9. **Print Ticket**: Generates a printable ticket for booked flights.

---

## **Tech Stack**

The application leverages the following technologies:

### **Frontend Framework**

- React 18.3.1

### **Development Tools**

- Vite 5.4.10
- Prettier 3.3.3
- ESLint 9.13.0
- Tailwind CSS 3.4.15

### **State Management**

- Redux Toolkit 2.4.0

### **API Communication**

- Axios 1.7.7

### **Utilities**

- Date-fns 4.1.0
- JS-Cookie 3.0.5
- JWT-Decode 4.0.0
- React Toastify 10.0.6
- SweetAlert2 11.14.5

### **UI Components**

- Flowbite 2.5.2
- Headless UI 2.2.0
- React Icons 5.3.0

### **Others**

- React Router Dom 7.0.2
- React Hook Form 7.53.2
- React Loading Skeleton 3.5.0
- Lottie Files 0.10.0
