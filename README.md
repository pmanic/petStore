
# 🐾 PetStore App

PetStore is a React + Redux-based web application that allows users to log in and browse available pets. It includes a smart AI-powered chatbot named **PetBot** 🤖 that helps users explore pets and place orders using natural language.

---

## 🚀 Getting Started

### 1. Install dependencies

```
npm install
```

### 2. Start the frontend

```
npm start
```

The app will be available at:
http://localhost:3000

> 🔒 **Login required** — You must log in with a user from `users.json` to see the pet list or use the chatbot.

---

## 🧠 PetBot (Chatbot)

The chatbot is built using [Rasa](https://rasa.com/), a powerful open-source conversational AI framework.

### ✅ What PetBot Can Do

- Greet and chat naturally
- Search available pets
- Provide links to pet detail pages
- Accept pet orders
- Respond to mood, confirmations, goodbyes, and bot-related questions

---

## 🛠️ Rasa Setup (Chatbot)

### 1. Install Rasa

> Make sure you have Python 3.8 or 3.10 installed.

```
pip install rasa
```

If you hit long-path issues on Windows, follow the instructions at:
https://pip.pypa.io/warnings/enable-long-paths

### 2. Go to the chatbot directory

```
cd chatbot
```

### 3. Train the chatbot

```
python -m rasa train
```

This creates a model inside the `models/` directory.

---

## 🧪 Run the Chatbot

To start the REST API server used by your React app:

```
python -m rasa run --enable-api --cors "*" --port 5005
```

### Test via command line

```
python -m rasa shell
```

---

## ✍️ Custom Action for Pet Search

PetBot connects to your real app data using a custom action.
The API used is: `https://api.npoint.io/105b23dafb9500adcbe8`

### 1. Run the action server

```
python -m rasa_sdk --port 5055
```

Make sure your `endpoints.yml` includes:

```
action_endpoint:
  url: "http://localhost:5055/webhook"
```

---

## 🔄 Commands Summary

| Action                        | Command                                                           |
|------------------------------|-------------------------------------------------------------------|
| Install Rasa                 | `pip install rasa`                                                |
| Train bot                    | `python -m rasa train`                                            |
| Run bot server               | `python -m rasa run --enable-api --cors "*" --port 5005`          |
| Run custom action server     | `python -m rasa_sdk --port 5055`                                  |
| Test chatbot in terminal     | `python -m rasa shell`                                            |
