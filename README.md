# Gemini Chat Clone (React + OTP Authentication)

A simple React-based chatroom application simulating Gemini chat interface with OTP authentication, chatroom management, and image upload support.

## Features

1. Phone Number OTP Authentication
2. Form validation using React Hook Form + Zod.
3. Fetch country codes dynamically via REST API.
4. Simulated OTP generation and verification.
5. Auth state stored in localStorage.
6. Chatroom Management
7. Create, search, and delete chatrooms.
8. Persist chatrooms in localStorage.
9. Dark mode toggle.
10. Message timestamp display.
11. Image upload in chat (Base64 encoded).
12. Copy message content to clipboard on hover.

### Technologies Used

1. React.js
2. React Hook Form + Zod
3. React Router DOM
4. React Toastify
5. Axios
6. Bootstrap 5 (CSS)

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
