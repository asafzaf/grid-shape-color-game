# backend/Dockerfile
FROM node:20

WORKDIR /app

# Copy root package.json and workspaces
COPY package.json package-lock.json* ./

# Copy backend and shared
COPY backend ./backend
COPY shared ./shared

WORKDIR /app/backend

RUN npm install

COPY backend . 

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "dev"]
