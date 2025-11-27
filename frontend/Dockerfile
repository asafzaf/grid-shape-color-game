FROM node:18

WORKDIR /app

COPY shared ./shared
COPY frontend ./frontend

WORKDIR /app/frontend
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
