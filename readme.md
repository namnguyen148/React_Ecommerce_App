# React Ecommerce App

## Overview
Welcome to the React Ecommerce App, a comprehensive application for managing users and products. This guide will walk you through setting up the backend and frontend components of the application.

## Prerequisites
Make sure you have the following installed on your system:
- PHP >= 7.3
- Composer
- Node.js >= 18.x
- npm (Node Package Manager)
- MySQL or any other supported database

## Installation Guide

### Backend Setup

1. **Navigate to the Laravel backend directory:**
    ```sh
    cd laravel-app
    ```

2. **Install PHP dependencies using Composer:**
    ```sh
    composer install
    ```

3. **Set up the environment configuration:**
    - Duplicate the `.env.example` file and rename it to `.env`
    - Update the `.env` file with your database and other necessary configurations

4. **Run the Laravel development server:**
    ```sh
    php artisan serve
    ```

### Frontend Setup

1. **Navigate to the React frontend directory:**
    ```sh
    cd react-app
    ```

2. **Install JavaScript dependencies using npm:**
    ```sh
    npm install
    ```

3. **Start the React development server:**
    ```sh
    npm start
    ```

### Database Setup

1. **Navigate back to the Laravel backend directory:**
    ```sh
    cd laravel-app
    ```

2. **Run the database migrations to set up your database schema:**
    ```sh
    php artisan migrate:fresh
    ```

3. **Seed the database with initial data:**
    ```sh
    php artisan db:seed --class=MstUsersTableSeeder
    ```

4. **Import Vietnam zones data (if applicable):**
    ```sh
    php artisan vietnamzone:import
    ```

## Additional Notes
- Ensure your MySQL or other database service is running and properly configured in the `.env` file.
- Use separate environment configurations for development and production to manage sensitive information securely.

## Conclusion
You should now have the React Ecommerce App running locally. Explore the features, manage users and products, and customize as needed. If you encounter any issues, please refer to the documentation or open an issue on the repository.
