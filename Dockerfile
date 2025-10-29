# ---- Build Stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Copy only package metadata first for layer caching
COPY package*.json ./
RUN npm ci

# Copy rest of the source
COPY . .

# Build step (optional: if you have TS or build script)
RUN npm run build || echo "no build step"

# ---- Runtime Stage ----
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copy only built output + deps
COPY --from=builder /app /app
RUN npm prune --production

EXPOSE 3000
CMD ["node", "src/server.js"]
