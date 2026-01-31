# Project Overview
**VagrantFile Generator** is a web-based tool designed to simplify the creation of Vagrant configuration files (`Vagrantfile`). It provides a user-friendly GUI for selecting operating systems (boxes), virtualization providers, and hardware resources (CPU, RAM), automatically generating the corresponding Ruby configuration code.

**Tech Stack:**
*   **Frontend Framework:** React 18
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS, Flowbite
*   **Templating Engine:** Handlebars (used for generating the Vagrantfile text)
*   **Editor:** React Ace (for the in-browser code preview)

# Building and Running

### Prerequisites
*   Node.js and npm/yarn installed.

### Installation
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    bun install
    ```

### Development Server
To start the local development server with hot module replacement:
```bash
bun dev
```
Access the app at the URL provided in the terminal (usually `http://127.0.0.1:5173`).

### Production Build
To build the application for production:
```bash
bun build
```
The output will be in the `dist/` directory.

### Preview Production Build
```bash
bun preview
```

# Architecture & Key Files

## Directory Structure
*   `src/`: Contains the main application source code.
    *   `App.jsx`: The primary component containing the form state, logic, and UI layout.
    *   `template/index.js`: Holds the Handlebars template string for the `Vagrantfile` and registers custom helpers.
    *   `main.jsx`: The application entry point mounting the React root.
*   `components/`: Reusable UI components and constant data.
    *   `constants/`: Configuration files for dropdowns and options (e.g., `boxes.js`, `providers.js`, `cpuOptions.js`).
    *   `Navbar/`, `Footer/`, `TextInput/`, `RadioCard/`: React components for the UI.
*   `public/`: Static assets like images.

## Core Logic
The application's core logic resides in `src/App.jsx`. It maintains the configuration state (`box`, `provider`, `memory`, etc.) and passes this data to the Handlebars template in `src/template/index.js` to generate the final string.

*   **Template Generation:** The `src/template/index.js` file defines a Handlebars template. Custom helpers like `when` are registered to handle conditional logic (e.g., singular vs. plural machine definitions).
*   **Dynamic Preview:** The `AceEditor` component in `App.jsx` displays the generated config, updating when the user triggers generation.

# Development Conventions

*   **Styling:** Tailwind CSS utility classes are used extensively for styling.
*   **State Management:** Local React state (`useState`) is used within `App.jsx`.
*   **Components:** Functional components with hooks are the standard.
*   **Configuration:** Data driving the UI options (like list of available OS boxes) is separated into `components/constants/` to make updates easier without touching component logic.
