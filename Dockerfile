# --- Stage 1: Build the VitePress Site ---
# Use an official Node.js image. The 'alpine' version is lightweight.
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Run the build command defined in package.json
# This will create the static files in 'documents/.vitepress/dist'
RUN npm run docs:build


# --- Stage 2: Serve the Static Files with Nginx ---
# Use a lightweight Nginx image
FROM nginx:stable-alpine

# Copy the static files from the 'builder' stage to the Nginx web root
COPY --from=builder /app/documents/.vitepress/dist /usr/share/nginx/html

# Copy our custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# The command to start the Nginx server in the foreground
CMD ["nginx", "-g", "daemon off;"]