FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
COPY scripts ./scripts
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
