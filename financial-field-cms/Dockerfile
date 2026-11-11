# Use official Node.js 22 slim image based on Debian Bookworm
FROM node:22-bookworm-slim

# Install system dependencies required for building native Node.js modules (like bcrypt, sharp, etc.)
RUN apt-get update \
 && apt-get install -y --no-install-recommends build-essential python3 git \
 && rm -rf /var/lib/apt/lists/*

# Create a non-root system user and working directory for security best practices
RUN install -d -o node -g node /home/node/app
USER node
ENV HOME=/home/node
WORKDIR /home/node/app

# Copy package management files and install dependencies (supports both npm ci and npm install)
COPY --chown=node:node package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Set production environment and copy project source code
ENV NODE_ENV=production
COPY --chown=node:node . .

# Build the Strapi admin panel and compile assets
RUN npm run build

# Redirect local uploads directory to a temporary path (Note: Ephemeral storage, consider S3/Cloudinary for persistence)
RUN rm -rf public/uploads && ln -s /tmp/uploads public/uploads

# Configure runtime environment variables (Port adjusted to 1337 for Strapi default)
ENV HOST=0.0.0.0 \
    PORT=1337 \
    STRAPI_TELEMETRY_DISABLED=true

# Ensure the upload directory exists and start the production server
CMD ["sh", "-c", "mkdir -p /tmp/uploads && exec npm run start"]