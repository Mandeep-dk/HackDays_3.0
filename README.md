# Decentralized Independent News Platform

## Overview
This is a decentralized and independent news platform that allows users to share news anonymously while ensuring fact-checking and credibility. The platform is designed to provide unbiased news without control from any organization, company, or government.

## Features
- **Anonymous News Uploads** – Users can share news without revealing their identity.
- **Fact-Checking with AI** – Google Gemini API is used to verify news credibility and flag potential misinformation.
- **Daily News Feed** – Google RSS Feed integration provides users with up-to-date news from verified sources.
- **Community Interaction** –  User content has upvotes, comments, and AI flagging.
- **Secure & Scalable** – Built with modern technologies to ensure performance and privacy.

## Tech Stack
- **Frontend:** ReactJS
- **Backend:** ExpressJS
- **AI Fact-Checking:** Google Gemini API
- **News Feed:** Google RSS Feed

## Installation & Setup
### Prerequisites
- Node.js & npm installed
- MongoDB (if using a database for news storage)

### Steps to Run
1. **Clone the repository:**
   ```sh
   git clone https://github.com/Mandeep-dk/HackDays_3.0.git
   cd HackDays_3.0
   ```

2. **Install dependencies for backend and frontend:**
   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the backend directory and add API keys for Google Gemini.

4. **Run the backend server:**
   ```sh
   cd backend
   npx nodemon index.js
   ```

5. **Run the frontend:**
   ```sh
   cd frontend
   npm run dev
   ```

## API Endpoints
### Fact-Checking API
- **POST `/news/fact-check`** – Sends news content to Google Gemini API for verification.

### News Upload API
- **POST `/news/upload-news`** – Allows users to submit news anonymously.

### RSS Feed Fetch API
- **GET `/search`** – Fetches the latest news articles from Google RSS Feed.
  
### Top Stories Fetch API
- **GET `/top-stories`** - Fetches top stories news articles from Google RSS Feed.

### Community News Fetch API
- **GET `/community-news`** - Fetches user uploaded latest news articles.
  
## Contribution
Feel free to contribute by submitting pull requests or reporting issues. We welcome improvements and new feature suggestions!

## Contact
For any inquiries or support, reach out to **mandeepdeka492@gmail.com**.

