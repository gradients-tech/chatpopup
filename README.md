# Chat Pop-up

Chat pop-up module that integrated with Gradients Conversation AI platform.

## License

[GNU General Public License v3](https://github.com/gradients-tech/chatpopup/blob/main/LICENSE).<br>
Copyright &copy; 2023 [Gradients Technology](https://github.com/gradients-tech). All rights reserved.

## Introduction

This chat module use Websockets to communicate with the server, allowing the user to chat with an AI language model in realtime. It has been designed to be embedded into any website.

## Features

- Support both Vietnamese and English
- Allows correction to be made to the Ai's response

## Technologies

- [React v18](https://react.dev/): A JavaScript library for building user interfaces.
- [Vite](https://vitejs.dev/): A build tool that uses **`ESBuild`**, which is written in **GO**, to bundle the code. **Faster than `Webpack`**.
- Websockets: A protocol that allows for real-time communication between the client and the server.

## Embedding

This can be embedded directly using the github url of the `.css` and `.js` files from the `dist` directory.

### 1. Add the following code to the `<head>`

```html
<link rel="stylesheet" href="link/to/the/file.css" />
<script defer type="module" src="/link/to/the/file.js"></script>
```

The stylesheet provides the styling for the chat, while the script provides the functionality.

Using `defer` and `type="module"` only loads the script after the page has loaded, and allows us to use ES6 modules.

### 2. Add the following code to the `<body>`

```html
<div id="chat-module-root"></div>
```

The location of the chat does not matter, since it relies on `position: fixed;` to position itself at the bottom right corner of the screen.

### 3. Changing the endpoint

The chat endpoint can be changed by modifying the `VITE_WS_HOST` variable in the `.env` file. The chat needs to be rebuilt for this change to take affect.

## Building

### 1. Clone the repository

```bash
git clone https://github.com/[your-username]/chat-module.git
```

### 2. Install dependencies

**Using `yarn`**

```bash
yarn
```

**Using `npm`**

```bash
npm install
```

### 3. Build the project

**Using `yarn`**

```bash
yarn build
```

**Using `npm`**

```bash
npm run build
```

### 4. Embed the files from the `dist` directory into your website

### Development

**Using `yarn`**

```bash
yarn dev
```

**Using `npm`**

```bash
npm run dev
```

The development server will be running at `localhost:3000`
