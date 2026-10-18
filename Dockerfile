FROM node:20-alpine
WORKDIR /app

# Copy manifests first so dependency installs are cached
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
EXPOSE 3000
CMD ["node", "server.js"]