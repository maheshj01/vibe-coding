#### React-Apps

This repo contains basic react apps for beginners. To create a new react app, you can use the `create-react-app.sh` script which will help you setup a new React Project

This script does the following

- Creates a new react app with the name you provide
- Sets up Typescript, TailwindCSS, ShadCN UI, and the following folder structure

```bash
- app
    - src
        - assets/
            - fonts/
            - images/
        - components/
            - ui/
                - Button.tsx
        - context/
        - hooks/
        - routes/
        - redux/
            - actions/
            - reducers/
        - store.ts
        - App.tsx
        - index.tsx
        - index.css
        - utils.ts
    - tsconfig.json
    - tailwind.config.js
    - package.json
    - postcss.config.js
    - README.md
```

### Usage

To create a new react app, run the following command

```bash
bash create-react-app.sh <app-name>
```

#### Fixes for Issues in the script

- Use "tailwindcss": "^3.4.10"


This script should run without issueson mac, But when running on Windows with WSL you need to convert the file to Unix format using the following command

```bash
sudo apt-get install dos2unix
dos2unix create.sh
```