import os
import json
import pydicom
from pydicom.dataset import Dataset, FileDataset
from pydicom.uid import ExplicitVRLittleEndian
from PIL import Image
import numpy as np
import datetime
import matplotlib.pyplot as plt
import requests


with open(r"./the-iqothnccd-lung-cancer-dataset-metadata.json") as f:
    metadata = json.load(f)


def random_name_generator():
    response = requests.get('https://randomuser.me/api/')
    data = response.json()
    name = data['results'][0]['name']['first'] + ' ' + data['results'][0]['name']['last']
    print(name)
    return name

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
        ds.PatientName = metadata['patientName']
        ds.PatientID = "12345"  # Example Patient ID, replace with actual ID
        ds.StudyInstanceUID = metadata['studyUid']
        ds.SeriesInstanceUID = metadata['seriesUid']
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
        ds.save_as(output_dir)
        print(f'Saved DICOM file to {output_dir}')

        # Load the DICOM file to print metadata and display the image
        dicom_dataset = pydicom.dcmread(output_dir)

        # Print DICOM metadata
        print(f"\nMetadata for {filename}:")
        print(dicom_dataset)

        # # Display the image
        # plt.imshow(dicom_dataset.pixel_array, cmap='gray')
        # plt.title(f'DICOM Image: {filename}')
        # plt.show()

    except Exception as e:
        print(f'Failed to convert {jpeg_file}: {e}')



def convert_images_to_dicom(root_folder, output_root, metadata):
    for root, dirs, files in os.walk(root_folder):

        # Create the corresponding output directory if it doesn't exist
        os.makedirs(output_dir, exist_ok=True)

        for dir in dirs:
            metadata['seriesUid'] = pydicom.uid.generate_uid()
            metadata['studyUid'] = pydicom.uid.generate_uid()
            metadata['patientName'] = random_name_generator()

            # get the list of files in the directory
            for file in os.listdir(os.path.join(root, dir)):
                if file.endswith('.jpg'):
                    jpg_path = os.path.join(root, dir, file)
                    os.makedirs(os.path.join(output_root, dir), exist_ok=True)
                    output_path = os.path.join(output_root, dir, file.replace('.jpg', '.dcm'))
                    create_dicom(jpg_path, output_path, metadata)

if __name__ == "__main__":
    # Create output directory if it doesn't exist
    # Specify the input directory containing JPEG files
    input_dir = "C:/Users/I1bra/Downloads/archive (1)/The IQ-OTHNCCD lung cancer dataset/Clustered_Benign_cases"
    output_dir = 'C:/Users/I1bra/Downloads/archive (1)/The IQ-OTHNCCD lung cancer dataset/TEST_DICOM_Benign_cases'
    os.makedirs(output_dir, exist_ok=True)


    # # Iterate over JPEG files in the input directory and convert them to DICOM
    # jpeg_files = [f for f in os.listdir(input_dir) if f.endswith('.jpg')]
    # for jpeg_file in jpeg_files:
    #     jpeg_file_path = os.path.join(input_dir, jpeg_file)
    #     create_dicom(jpeg_file_path, output_dir, metadata)

    convert_images_to_dicom(input_dir, output_dir, metadata)

