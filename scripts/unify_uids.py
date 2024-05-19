import requests
import os
import uuid
import pydicom

def random_name_generator():
    response = requests.get('https://randomuser.me/api/')
    data = response.json()
    name = data['results'][0]['name']['first'] + ' ' + data['results'][0]['name']['last']
    print(name)
    return name

def assign_uids_to_dicom(folder_path):
    for root, dirs, files in os.walk(folder_path):
        # Generate unique Study Instance UID and Series Instance UID

        for dir in dirs:
            series_uid = pydicom.uid.generate_uid()
            study_uid = pydicom.uid.generate_uid()
            patient_name = random_name_generator()
            
           # get the list of files in the directory
            for file in os.listdir(os.path.join(folder_path, dir)):
                # Load the DICOM file
                dicom_dataset = pydicom.dcmread(os.path.join(folder_path, dir, file))
                
                # Set the Study Instance UID, Series Instance UID, and Patient Name
                dicom_dataset.StudyInstanceUID = study_uid
                dicom_dataset.SeriesInstanceUID = series_uid
                dicom_dataset.PatientName = patient_name
                
                # Save the DICOM file
                dicom_dataset.save_as(os.path.join(folder_path, dir, file))
                print(f'Saved {patient_name} DICOM file to {os.path.join(folder_path, dir, file)}')
                

if __name__ == '__main__':
    folder_path = "C:/Users/I1bra/Downloads/archive (1)/The IQ-OTHNCCD lung cancer dataset/DICOM_Benign_cases"
    assign_uids_to_dicom(folder_path)
