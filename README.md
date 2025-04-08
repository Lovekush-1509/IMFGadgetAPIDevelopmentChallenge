# IMFGadgetAPIDevelopmentChallenge 🚀

This is a secure and feature-rich RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing spy gadgets. It supports gadget lifecycle operations, user authentication (JWT), and more.

🔗 **Live URL:** [IMFGadgetAPIDevelopmentChallenge](https://imfgadgetapidevelopmentchallenge-6.onrender.com)

---

## 🔧 Features

- ✅ JWT-based Authentication and Authorization
- 🧪 CRUD operations for gadgets
- 💥 Self-destruct simulation with confirmation code
- 📊 Randomized mission success probability
- 🔍 Filter gadgets by status (e.g., Available, Deployed)
- 👮‍♂️ Secure routes via middleware

---

## 🔐 Authentication

Authentication is done using JSON Web Tokens (JWT). You'll need to:
- Register/Login to get a token
- Pass the token in the `Authorization` header like this:
  
  ```http
  Authorization: Bearer <your_token_here>
