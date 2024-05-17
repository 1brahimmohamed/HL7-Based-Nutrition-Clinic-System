import os
import json
import pydicom
from pydicom.dataset import Dataset, FileDataset
from pydicom.uid import ExplicitVRLittleEndian
from PIL import Image
import numpy as np
import datetime
import matplotlib.pyplot as plt


with open("D:/Downloads/the-iqothnccd-lung-cancer-dataset-metadata.json") as f:
    metadata = json.load(f)
    
    
# Function to create a DICOM file from a JPEG image
def create_dicom(jpeg_file, output_dir, metadata):
    try:
        # Read the JPEG image
        im = Image.open(jpeg_file)
        
        # Convert to grayscale if the image is RGB
        if im.mode == 'RGB':
            im = im.convert('L')
        
        # Convert image to 16-bit grayscale
        im = im.convert('I;16')
        im_np = np.array(im)
        
        # Create a new DICOM file
        filename = os.path.basename(jpeg_file).replace('.jpg', '.dcm')
        file_meta = pydicom.dataset.FileMetaDataset()
        file_meta.MediaStorageSOPClassUID = pydicom.uid.generate_uid()
        file_meta.MediaStorageSOPInstanceUID = pydicom.uid.generate_uid()
        file_meta.ImplementationClassUID = pydicom.uid.generate_uid()
        file_meta.TransferSyntaxUID = ExplicitVRLittleEndian
        
        ds = FileDataset(filename, {}, file_meta=file_meta, preamble=b"\0" * 128)
        
        # Set the transfer syntax
        ds.is_little_endian = True
        ds.is_implicit_VR = False
        
        # Set patient and study information
        ds.PatientName = metadata['creator']['name']
        ds.PatientID = "12345"  # Example Patient ID, replace with actual ID
        ds.StudyInstanceUID = pydicom.uid.generate_uid()
        ds.SeriesInstanceUID = pydicom.uid.generate_uid()
        ds.SOPInstanceUID = file_meta.MediaStorageSOPInstanceUID
        ds.Modality = "CT"  # Example modality, replace with actual
        ds.StudyDate = datetime.datetime.now().strftime('%Y%m%d')
        ds.StudyTime = datetime.datetime.now().strftime('%H%M%S')
        
        # Set image information
        ds.Rows, ds.Columns = im_np.shape
        ds.SamplesPerPixel = 1
        ds.PhotometricInterpretation = "MONOCHROME2"
        ds.PixelRepresentation = 0
        ds.HighBit = 15
        ds.BitsStored = 16
        ds.BitsAllocated = 16
        ds.SmallestImagePixelValue = int(np.min(im_np))
        ds.LargestImagePixelValue = int(np.max(im_np))
        
        ds.PixelData = im_np.tobytes()
        
        # Save the DICOM file
        dicom_path = os.path.join(output_dir, filename)
        ds.save_as(dicom_path)
        print(f'Saved DICOM file to {dicom_path}')
        
        # Load the DICOM file to print metadata and display the image
        dicom_dataset = pydicom.dcmread(dicom_path)
        
        # Print DICOM metadata
        print(f"\nMetadata for {filename}:")
        print(dicom_dataset)
        
        # Display the image
        plt.imshow(dicom_dataset.pixel_array, cmap='gray')
        plt.title(f'DICOM Image: {filename}')
        plt.show()
    
    except Exception as e:
        print(f'Failed to convert {jpeg_file}: {e}')
        
        
if __name__ == "__main__":
    # Create output directory if it doesn't exist
    # Specify the input directory containing JPEG files
    input_dir = r'D:/Downloads/archive/The IQ-OTHNCCD lung cancer dataset/Normal cases'
    output_dir = 'C:/Users/ameer/Dicom task'
    os.makedirs(output_dir, exist_ok=True)
    
    
    # # Iterate over JPEG files in the input directory and convert them to DICOM
    # jpeg_files = [f for f in os.listdir(input_dir) if f.endswith('.jpg')]
    # for jpeg_file in jpeg_files:
    #     jpeg_file_path = os.path.join(input_dir, jpeg_file)
    #     create_dicom(jpeg_file_path, output_dir, metadata)
    
