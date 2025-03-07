# Stage 1: Build the application
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the project (for Expo web)
RUN npx expo export:web

# Stage 2: Serve the built application
FROM node:18-alpine
WORKDIR /app

# Copy the built files from the build stage
COPY --from=build /app/web-build ./web-build

# Install serve globally to serve static files
RUN npm install -g serve

# Expose the port
EXPOSE 9001

# Serve the built application
CMD ["serve", "-s", "web-build", "-l", "9001"]