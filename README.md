# Chat Pop-up

Chat pop-up module that integrated with Gradients Conversation AI platform.

## License

[GNU General Public License v3](https://github.com/gradients-tech/chatpopup/blob/main/LICENSE).

Copyright &copy; 2023 [Gradients Technology](https://github.com/gradients-tech). All rights reserved.

<hr/>

## Introduction

This chat module use Websockets to communicate with the server, allowing the user to chat with an AI language model in realtime. It has been designed to be embedded into any website.

## Features

- Support both Vietnamese and English
- Allows correction to be made to the Ai's response

## Technologies

- [React v18](https://react.dev/): A JavaScript library for building user interfaces.
- Websockets: A protocol that allows for real-time communication between the client and the server.

<hr/>

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
<div id="chat-module-root" data-host="ws://host"></div>
```

The location of the chat does not matter, since it relies on `position: fixed;` to position itself at the bottom right corner of the screen.

### 3. Changing the endpoint

The chat endpoint can be changed by modifying the `data-host` attribute of the `div`. This is mandatory for the chat to function.

```html
<div id="chat-module-root" data-host="ws://host"></div>
```

### 4. Adding language support requires the following steps

- Add the language to the `LANGUAGES` map in `src/constants/language.ts`

```js
{
  ...,
  languageCode: {
    name: 'Display name', // Vietnam (VI)
    icon: 'link/to/icon', // https://link/to/icon
  }
}
```

> **Note**: `languageCode` should be in the format of [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) for consistency.

- Re-config `TASK_LIST` in `src/constants/tasks.ts`

- Rebuild the project

### 5. Changing the theme (optional)

**Default**:

```css
--text-primary: #d56871;
--bg-primary: #0a2133;
--bg-secondary: #fefefe;
--bg-chat: #eff9ff;
```

This can be done via the `style` attribute of the `<div id='chat-module-root'></div>`:

```html
<div id="chat-module-root" data-host="ws://host" style="--text-primary: new-value; --bg-primary: new-value;"></div>
```

Or the `:root` selector.

```css
/* global.css */

/* Global variable */
:root {
  --text-primary: new-value;
  --bg-primary: new-value;
}

/* OR */

/* Scope variable */
#chat-module-root {
  --text-primary: new-value;
  --bg-primary: new-value;
}
```

Then importing the file into the `index.html` after base `.css` file:

```html
<link rel="stylesheet" href="link/to/the/file.css" />
<link rel="stylesheet" href="global.css" />
```


### 6. Changing the bot name (optional)

**Default**: `F.R.I.D.A.Y`

The bot name can be modified using the `data-chat-name` attribute of the `<div id='chat-module-root'></div>`.

```html
<div id="chat-module-root" data-host="ws://host" data-chat-name="Bot Name"></div>
```

<hr/>

## Building

### 1. Clone the repository

```bash
git clone https://github.com/gradients-tech/chatpopup.git
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

<hr/>

## Development

**Using `yarn`**

```bash
yarn dev
```

**Using `npm`**

```bash
npm run dev
```

The development server will be running at `localhost:3000`
