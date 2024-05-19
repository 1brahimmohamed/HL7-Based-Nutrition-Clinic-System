import pydicom
import cv2
import numpy as np

img_width = 256
img_height = 256

classes = {
    0: 'benign',
    1: 'malignant',
    2: 'normal'
}

def preprocess_dicom(dicom_path, target_size):
    # Load DICOM image
    dicom_data = pydicom.dcmread(dicom_path)

    # Get pixel array and convert to numpy array
    pixel_array = dicom_data.pixel_array
    image = np.array(pixel_array)

    # Convert to RGB
    rgb_image = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)

    # Resize image
    resized_image = cv2.resize(rgb_image, target_size)

    # Expand dimensions to match model input shape
    processed_image = np.expand_dims(resized_image, axis=0)

    return processed_image


def classify(dicom_file_path, model):

    # Target shape for resizing
    target_shape = (img_width, img_height)

    # Call the function to load and resize the single DICOM file
    pixel_array = preprocess_dicom(dicom_file_path, target_shape)

    # Now you can use the pixel_array variable containing the resized pixel array
    print(pixel_array.shape)  # Display the shape of the pixel array

    # Make prediction
    predictions = model.predict(pixel_array)

    # Get the predicted class (assuming class labels are ['class_1', 'class_2', 'class_3'])
    predicted_class = np.argmax(predictions, axis=1)

    # Print the predicted class
    print("Predicted class:", predicted_class)
    print("Predicted class label:", classes[predicted_class[0]])

    return classes[predicted_class[0]]
