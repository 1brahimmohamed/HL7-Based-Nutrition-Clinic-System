# HL7-Based-Nutrition-Clinic-System

### Table of Contents

- [Introduction](#introduction)
- [Overview](#overview)
- [Features](#features)
- [Dataset](#dataset)
- [Technologies](#technologies)
- [Demo](#demo)
- [Contributors](#contributors)

### Introduction

A Nutrition Clinic Management System that is developed to help nutritionists managing their daily operations.
The system is also integrated with a clinical decision support tool for lung cancer classification.
This system is developed as a part of the Healthcare Information System course at the Department of Systems & Biomedical Engineering, Cairo University.

### Overview
The system mainly consists of:
- Doctor Portal.
- Clincal desicion support module (CDSS).

### Features 
- Doctor Portal
    - Doctor Login
    - Doctor Registration
    - Doctor operations
        - View all appointments (pending, cancelled and in-progress) appointments.
        - View patient data.
            - Personal data.
            - Clinical data including (allergies & drugs).
            - View & edit some clinical data as lab tests, prescriptions & diet plans.
            - Edit some in-body test parameters as weight, weight control, fats & fat control.
            - Upload new in body test.
            - Referal of the patient to another clinic this was built using HL7 communication.
- Clinical desicion support module
    - Uploading DICOM studies.
    - Doctor Registration
    - Medical viewing.
        - Allow multiple features as Panning, Zooming & Windowing.
        - Classify each slice indepentently into malignant,benign or normal.
        - Provide information about the uploaded study as number of instances Uploaded, study Uid, series Uid and patient name.
        - Show the overall result for the uploaded study.
        - Specifically define the slices including malignant or benign tumors.
         
### Dataset 
- Source: Iraq-Oncology Teaching Hospital/National Center for Cancer Diseases, if you want to access the dataset [Click here](https://www.kaggle.com/datasets/hamdallak/the-iqothnccd-lung-cancer-dataset) 
- Size:
    - 1097 CT scan slices including 561 malignant, 120 bengin & 416 normal slices.
    - 110 cases including 40 malignant, 15 bengin & 55 normal.
- Format: Originally collected in DICOM, but the dataset was available only in JPG format, so we added the metadata and converted it into DICOM.
  
  
### Technologies
- System
    - Frontend: React with Typescript
    - Backend: NodeJs with Typescript
    - Database: MongoDB
    - CDSS module: Python FastAPI 
     
-  Deep learning model
    - Used MobileNet pre-trained model with a Softmax output layer for classification.
    - Model input: DICOM image pixel array
    - Model output: class with the highest probability from Softmax layer
     


### Demo
- CDSS module
![Demo](CDSS_Demo.gif)

### Contributors
<a href="https://github.com/1brahimmohamed">
  <img src="https://avatars.githubusercontent.com/1brahimmohamed"  width="100px; "/>
</a>

<a href="https://github.com/mahamedhat">
  <img src="https://avatars.githubusercontent.com/mahamedhat" width="100px; "/>
  
</a>

<a href="https://github.com/AmeeraMOhammed">
  <img src="https://avatars.githubusercontent.com/AmeeraMOhammed" width="100px; " />
</a>

<a href="https://github.com/doha-eid">
  <img src="https://avatars.githubusercontent.com/doha-eid"  width="100px; "/>
</a>

<a href="https://github.com/mayekhaled0">
  <img src="https://avatars.githubusercontent.com/mayekhaled0"  width="100px; "/>
</a>
    
      
### Submitted to:
Dr. Eman Ayman & Eng. Yara Wael
All rights reserved © 2024 to MDIMA team (Systems & Biomedical Engineering, Cairo University Class 2024)


