### **Frontend Team Documentation**

---

## **FRONTEND TEAM**

| **Name**                 | **Tasks**       |
| ------------------------ | --------------- |
| **Rafly Aziz Abdillah**  | Init project    |
| **Tegar Alfa Rizzi**     | _To be defined_ |
| **Melinda Wijaya**       | _To be defined_ |
| **Yogi Efani Yancandra** | _To be defined_ |

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

4. Run the application for local development:
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

---

## **Features (Soon)**

- A list of features will be added in future updates.

---
