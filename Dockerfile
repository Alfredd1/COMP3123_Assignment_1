FROM node:20-alpine
WORKDIR /app

# Copy manifests first so dependency installs are cached
COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=3000
# Default MongoDB URL; Compose overrides this per-service.
ENV MONGO_URL=mongodb://mongo:27017/mydb

EXPOSE 3000

# Healthcheck so Compose/orchestrators can tell when the API is ready
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/',r=>process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))" || exit 1

CMD ["node", "server.js"]
