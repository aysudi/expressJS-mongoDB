# Use Node.js base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Install only what we need
COPY package*.json ./
RUN npm install

# Copy the full source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your app uses
EXPOSE 8080

# Start the app using the compiled JS
CMD ["npm", "start"]
