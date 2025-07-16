# Gemini Chat Clone (React + OTP Authentication)

A simple React-based chatroom application simulating Gemini chat interface with OTP authentication, chatroom management, and image upload support.

## Features

Phone Number OTP Authentication
Form validation using React Hook Form + Zod.
Fetch country codes dynamically via REST API.
Simulated OTP generation and verification.
Auth state stored in localStorage.
Chatroom Management
Create, search, and delete chatrooms.
Persist chatrooms in localStorage.
Chat Functionality
Send and receive simulated AI replies.
Dark mode toggle.
Message timestamp display.
Image upload in chat (Base64 encoded).
Copy message content to clipboard on hover.
Technologies Used
React.js
React Hook Form + Zod
React Router DOM
React Toastify
Axios
Bootstrap 5 (CSS)

### Installation & Setup

```
git clone https://github.com/sonykikuma/gemini-clone.git
cd gemini-chat-clone
npm install
npm run dev
```

### Project Structure

/components/AuthForm.js → Handles OTP-based login.
/components/Dashboard.js → Displays chatrooms and handles dark mode.
/components/ChatRoom.js → Displays chat messages, image upload, and copy to clipboard feature.

### How to Use

1. Start App: npm run dev
2. Authenticate:
   Enter country code and phone number.
   Verify simulated OTP displayed via toast.
3. Chatrooms:
   Create a new chatroom.
   Click on chatroom name to open.
   Upload images or send text.
4. Copy Message:
   Hover over a message and click the "Copy" button.
