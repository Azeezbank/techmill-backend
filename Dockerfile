FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Remove previous build (if exists), generate Prisma client, and build
RUN rm -rf dist && npx prisma generate && npm run build

# Expose the port
EXPOSE 5000

# Start the application
CMD ["node", "dist/index.js"]