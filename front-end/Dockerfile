# Use the official Node.js base image
FROM node:latest

# Specify working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json .

# Install project dependencies
RUN npm i

# Copy source
COPY . .
