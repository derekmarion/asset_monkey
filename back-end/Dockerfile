# Use the official Python base image
FROM python:latest

# Set environment variables for the Django application
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create and set the working directory inside the container
WORKDIR /app

# updates ubuntus installer
RUN apt-get update

# Install system dependencies to interact with postgresql, OCR and PDF binaries
RUN apt-get install -y --no-install-recommends \
    gcc \
    postgresql-client \
    tesseract-ocr \
    poppler-utils

# Install cv2 dependencies
RUN apt-get install -y libgl1

# COPY requirements.txt onto the Docker container
COPY requirements.txt .

# Upgrade pip
RUN pip install --upgrade pip

# Install Python Projects Environment dependencies
RUN pip install -r requirements.txt

# Copy the entire Django project to the container
COPY . .
