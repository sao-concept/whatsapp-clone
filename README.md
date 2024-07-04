# WhatsApp Clone

This project is a clone of the WhatsApp web application built using ReactJS, Tailwind CSS, Firebase, and several other technologies. It replicates core features of WhatsApp, including real-time messaging, emoji picker, attachment options, and more.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Sign in with Google.
- **Real-Time Messaging**: Send and receive messages in real-time.
- **Emoji Picker**: Select and send emojis within your messages.
- **Attachments**: Send documents, images, videos, and audio.
- **Responsive Design**: Optimized for both desktop and mobile views.

## Technologies Used

- **ReactJS**: For building the user interface.
- **Tailwind CSS**: For styling.
- **Firebase**: For backend services including authentication and Firestore.
- **Firebase Storage**: For storing and retrieving attachments.
- **React Icons**: For using various icons in the application.
- **Emoji Picker React**: For the emoji picker component.
- **date-fns**: For date formatting.

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/your-username/whatsapp-clone.git
   cd whatsapp-clone
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Set up Firebase**:

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Configure Firebase Authentication, Firestore, and Storage.
   - Replace the Firebase configuration in `src/firebase.js` with your own Firebase config.

4. **Run the application**:
   ```sh
   npm start
   ```

## Usage

- **Sign In**: Click the "Login with Google" button to sign in.
- **Send Messages**: Type a message in the input box and press Enter or click the send icon.
- **Send Emojis**: Click the emoji icon to select and send emojis.
- **Send Attachments**: Click the attachment icon to choose and send various types of attachments.

## Project Structure

```plaintext
whatsapp-clone/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/
│   │   └── ...
│   ├── components/
│   │   ├── AttachmentMenu.jsx
│   │   ├── AudioRecorderButton.jsx
│   │   ├── CameraButton.jsx
│   │   ├── EmojiPickerButton.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   └── WhatsApp.jsx
│   ├── firebase.js
│   ├── App.js
│   ├── index.js
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
