# React + Laravel (Token Auth) Fullstack App

Aplikasi autentikasi menggunakan **Laravel 8** (backend) dan **React + Vite** (frontend) dengan **token-based authentication**. 

---

## 🚀 Fitur

- Login & Register (token-based)
- Logout
- Validasi form lengkap
- Proteksi halaman `/users` setelah login
- Transisi animasi form login <-> register
- Menggunakan **XAMPP (MySQL)** sebagai database server

---

## 📁 Struktur Folder

project-root/
├── backend/ # Laravel project
└── frontend/ # React + Vite project


---

## ⚙️ Instalasi & Setup (XAMPP)

### 1. Backend (Laravel 8)

```bash
cd backend

# Install dependensi
composer install

# Copy file .env
cp .env.example .env

# Generate APP_KEY
php artisan key:generate

# Atur database di .env:
# Pastikan MySQL aktif di XAMPP
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=auth_token
DB_USERNAME=root
DB_PASSWORD=

# Migrasi database
php artisan migrate

# Jalankan server Laravel
php artisan serve
```

### 2. Frontend (React + Vite)

```bash
cd frontend

# Install node_modules
npm install

# Jalankan React dev server
npm run dev
