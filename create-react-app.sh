#!/bin/bash
# Capture the start time
start_time=$(date +%s)

# Check if a project name is provided as an argument
if [ -z "$1" ]; then
  echo "Please provide a project name as an argument."
  exit 1
fi

# Check if directory exists and prompt for overwrite
if [ -d "$1" ]; then
  echo "Directory $1 already exists."
  while true; do
    read -p "Do you want to overwrite it? (y/n) " yn
    case $yn in
      [Yy]* ) break;;
      [Nn]* ) exit;;
      * ) echo "Please answer yes or no.";;
    esac
  done
fi

# Create React app with TypeScript template
npx create-react-app $1 --template typescript

# Navigate to project directory
cd "$1" || exit

# Install TailwindCSS and its dependencies
npm install -D tailwindcss postcss autoprefixer
npm install react-icons --save
npx tailwindcss init -p

# Remove unnecessary files
rm src/logo.svg 
rm src/App.css
rm src/App.test.tsx
rm src/setupTests.ts

# Setup folder structure
mkdir -p src/{components,hooks,routes,context,assets/{images,fonts}}

# Create Tailwind config file
echo "/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      }
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
      xs: '2px',
      full: '9999px',
    },
    fontFamily: {
      sans: ['var(--font-sans)', ...fontFamily.sans],
    },
    keyframes: {
      'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
    },
    screens: {
      'xxs': '360px',
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    }

  },
  plugins: [require('tailwindcss-animate')],
}
" > tailwind.config.js

echo 'import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "./components/ui/button";
const App: React.FC = () => {
  const [counter, setCounter] = React.useState<number>(0);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        You have tapped the button
        <span className="text-4xl">{counter}</span>
        times
      </div>
      <Button
        className="mt-4"
        onClick={() => setCounter(counter + 1)}> <div className="flex space-x-2 items-center justify-center">
          <FaPlus />
        </div> </Button>
    </div>
  );
}

export default App;
' > src/App.tsx

# Create a Tailwind CSS file in src
echo "@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    :root {
        --background: 0 0% 100%;
        --foreground: 222.2 47.4% 11.2%;

        --muted: 210 40% 96.1%;
        --muted-foreground: 215.4 16.3% 46.9%;

        --popover: 0 0% 100%;
        --popover-foreground: 222.2 47.4% 11.2%;

        --border: 214.3 31.8% 91.4%;
        --input: 214.3 31.8% 91.4%;

        --card: 0 0% 100%;
        --card-foreground: 222.2 47.4% 11.2%;

        --primary: 222.2 47.4% 11.2%;
        --primary-foreground: 210 40% 98%;

        --secondary: 210 40% 96.1%;
        --secondary-foreground: 222.2 47.4% 11.2%;

        --accent: 210 40% 96.1%;
        --accent-foreground: 222.2 47.4% 11.2%;

        --destructive: 0 100% 50%;
        --destructive-foreground: 210 40% 98%;

        --ring: 215 20.2% 65.1%;

        --radius: 0.5rem;
    }

    .dark {
        --background: 224 71% 4%;
        --foreground: 213 31% 91%;

        --muted: 223 47% 11%;
        --muted-foreground: 215.4 16.3% 56.9%;

        --accent: 216 34% 17%;
        --accent-foreground: 210 40% 98%;

        --popover: 224 71% 4%;
        --popover-foreground: 215 20.2% 65.1%;

        --border: 216 34% 17%;
        --input: 216 34% 17%;

        --card: 224 71% 4%;
        --card-foreground: 213 31% 91%;

        --primary: 210 40% 98%;
        --primary-foreground: 222.2 47.4% 1.2%;

        --secondary: 222.2 47.4% 11.2%;
        --secondary-foreground: 210 40% 98%;

        --destructive: 0 63% 31%;
        --destructive-foreground: 210 40% 98%;

        --ring: 216 34% 17%;

        --radius: 0.5rem;
    }
}

@layer base {
    * {
        @apply border-border;
    }

    body {
        @apply bg-background text-foreground;
        font-feature-settings: "rlig" 1, "calt" 1;
    }
}
" > src/index.css

echo '{
  "compilerOptions": {
    "target": "es5",
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./*"
      ]
    },
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
' > tsconfig.json

# Setup Shadcn

echo '{
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/src/components",
    "utils": "@/src/utils",
    "ui": "@/src/components/ui",
    "hooks": "@/src/hooks"
  },
  "iconLibrary": "lucide"
}
' > components.json

echo '
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
' > src/utils.ts

npm install tailwindcss-animate class-variance-authority clsx tailwind-merge
npm install lucide-react
npm install @radix-ui/react-icons
npx shadcn@latest add button
npm i --save-dev @types/react-dom

# add env file
touch .env
# add to gitignore
echo ".env" >> .gitignore

echo "would you like to install redux? (y/n)"
read -r installRedux
if [ "$installRedux" = "y" ]; then
  npm install redux react-redux @types/react-redux
  npm install @reduxjs/toolkit

  mkdir -p src/{store,store/reducers,store/actions}
  echo '
  import { configureStore } from "@reduxjs/toolkit";

  const store = configureStore({
    reducer: {}
  });

  export type RootState = ReturnType<typeof store.getState>;
  export default store;
  ' > src/store.ts

  echo 'redux installed'
fi

# Capture the end time
end_time=$(date +%s)

# Calculate and display the time spent
execution_time=$((end_time - start_time))
echo "project setup Successful execution time: $execution_time seconds"