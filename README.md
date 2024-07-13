# Advanced URL Shortener with Advanced Analytics

## Introduction

This project is designed to evaluate skills in designing and implementing a robust backend API for a URL shortener service with comprehensive analytics capabilities. The objective is to develop a powerful URL shortener API that provides functionalities like shortening URLs, tracking visits, providing analytics, and more.

## Table of Contents
- [Introduction](#introduction)
- [Objective](#objective)
- [Technical Requirements](#technical-requirements)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Request and Response Formats](#request-and-response-formats)
- [Database Schema](#database-schema)
- [Caching](#caching)
- [Security Measures](#security-measures)
- [Background Jobs](#background-jobs)
- [Sample Data Script](#sample-data-script)
- [Evaluation Criteria](#evaluation-criteria)

## Objective

The objective is to develop a URL shortener API with the following functionalities:

1. **Shorten URLs**: Generate a unique or custom short code for the URL and store the mapping in a database.
2. **Redirect with Advanced Tracking**:
    - Track visits (timestamp, user agent, IP address, etc.).
    - Increment counters for total visits, unique visitors, and visits by device type.
    - Redirect the user to the original URL.
3. **Shortened URL Analytics**: Retrieve detailed analytics including:
    - Original URL
    - Total number of visits
    - Number of unique visitors
    - Breakdown of visits by device type
    - Top referring websites
    - Time series data of visits
4. **Advanced Functionalities**:
    - Custom short codes
    - Shortened URL expiration
    - API rate limiting
    - Background jobs for asynchronous tasks

## Technical Requirements

- **Programming Language**: Node.js
- **Database**: Prisma with PostgreSQL
- **Caching**: Redis

## Setup Instructions

1. **Clone the repository**:
    ```sh
    git clone https://github.com/Tabishhaider72/Backend-Developer-Internship-Assignment.git
    cd Backend-Developer-Internship-Assignment
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up the database**:
    - Ensure PostgreSQL is installed and running.
    - Configure the database connection in the `.env` file.

4. **Run the migrations**:
    ```sh
    npx prisma migrate dev
    ```

5. **Start the application**:
    ```sh
    npm start
    ```
