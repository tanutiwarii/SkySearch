# AeroBook - Airline Ticket Reservation System

## ✈️ Overview
AeroBook is a modern airline ticket reservation system that allows users to search for flights, view details, and book tickets seamlessly. The system includes an admin backend for managing flights and integrates real-time flight data using the **AviationStack API**.
<img width="1440" alt="Screenshot 2025-03-24 at 10 58 26 PM" src="https://github.com/user-attachments/assets/caf1e8c8-784d-48e8-b20f-fe63d8b37864" />
<img width="1440" alt="Screenshot 2025-03-24 at 10 58 36 PM" src="https://github.com/user-attachments/assets/7c301a0d-1fe5-4cac-9263-2bcf8e9f30e7" />
<img width="1440" alt="Screenshot 2025-03-24 at 10 58 55 PM" src="https://github.com/user-attachments/assets/cf38e2c6-d8be-4572-8d65-94c59c2815d5" />
<img width="1440" alt="Screenshot 2025-03-24 at 10 59 06 PM" src="https://github.com/user-attachments/assets/03c33a4c-9a82-42fc-a0d9-c8819ae9c03b" />
<img width="1440" alt="Screenshot 2025-03-24 at 10 59 16 PM" src="https://github.com/user-attachments/assets/c3e939f1-6728-4e12-9e70-af4b69e80332" />

## 🚀 Features
- 🔍 **Flight Search:** Search flights by origin, destination, and date.
- 🛫 **Live Flight Data:** Fetches real-time flight data via the **AviationStack API**.
- 🏙 **Airport Database:** Stores airport information for accurate search results.
- 📅 **Flight Management:** Admin panel to manage flight schedules.
- 💳 **Secure Payments:** Future support for payment gateways.
- 🌙 **Dark Mode Support:** Modern UI with Light/Dark mode.

## 🏗️ Tech Stack
### **Frontend:**
- React.js (Next.js in future versions)
- Styled Components / CSS Modules
- ShadCN/UI & Framer Motion for UI/UX

### **Backend:**
- Node.js, Express.js
- MongoDB (Mongoose ORM)
- AviationStack API (for live flight data)
- Cron Jobs (for periodic data sync)

### **Deployment:**
Future Work
- Frontend: **Vercel / Netlify**
- Backend: **Render / AWS / Railway**
- Database: **MongoDB Atlas**

## 🛠 Installation & Setup
### **1️⃣ Clone the Repository**
```sh
 git clone https://github.com/your-username/aerobook.git
 cd aerobook
```

### **2️⃣ Install Dependencies**
```sh
 npm install
 cd frontend && npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the root directory and add:
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
AVIATIONSTACK_API_KEY=your_aviationstack_api_key
```

### **4️⃣ Run the Backend Server**
```sh
npm run dev
```

### **5️⃣ Run the Frontend**
```sh
cd frontend
npm run dev
```

The project will be available at `http://localhost:3000`.

## 📡 API Endpoints
### **Airports API**
- `GET /api/airports` - Fetch all stored airports.
- `GET /api/airports/sync` - Sync latest airport data from AviationStack API.

### **Flights API**
- `GET /api/flights` - Fetch stored flights with optional filters (origin, destination, date).
- `GET /api/flights/sync` - Sync latest flight data from API.

## 📌 Future Enhancements
- ✅ User authentication & booking history.
- ✅ Integration with Stripe or PayPal for payments.
- ✅ Real-time flight tracking.
- ✅ Next.js migration for SEO optimization.
- ✅ Docker support for containerized deployment.

## 🤝 Contribution
Contributions are welcome! Feel free to fork this repository and submit a pull request.


---

🚀 **Developed by [Tanu](https://github.com/tanutiwarii)**

