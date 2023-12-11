import pytesseract
import cv2
import numpy as np
import requests
from pdf2image import convert_from_path


def perform_ocr(file_path):
    try:
        # Check if document is a PDF
        if file_path.lower().endswith(".pdf"):
            # Convert PDF pages to PIL images
            images = convert_from_path(file_path)

            # OCR each page of PDF and append to text blob
            text_blob = ""
            for image in images:
                np_image = np.array(image)
                # Pass cv2 ndarray for efficient read of PIL images
                img = cv2.cvtColor(np.array(np_image), cv2.COLOR_BGR2RGB)
                text_blob += pytesseract.image_to_string(img)
        else:
            # Load input image and convert from BGR to RGB channel order
            image = cv2.imread(file_path)
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

            # Use Tesseract to OCR the image
            text_blob = pytesseract.image_to_string(image)

        return text_blob.strip()

    except Exception as e:
        print(f"Error during OCR: {e}")
        return None


def parse_text(text):
    pass
