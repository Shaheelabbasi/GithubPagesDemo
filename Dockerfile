# Use an official Node.js image from Docker Hub as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app code
COPY . .

# Expose port 3000 (or whatever port your app uses)
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
