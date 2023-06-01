# Use an official Node.js runtime as a parent image
FROM node:18.3.0-alpine

# Install nodemon to run the server
RUN npm install -g nodemon

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY package.json .

# Install any required dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Make the container's port 3000 available to the outside world
EXPOSE 3000

# Define the command that will run when the container starts
CMD ["npm", "run", "dev"]
