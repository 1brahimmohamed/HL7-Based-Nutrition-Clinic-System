# HL7-Based-Nutrition-Clinic-System

### Table of Contents

- [Introduction](#introduction)
- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [How to Run the Project](#how-to-run-the-project)
- [Demos](#demos)
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
- [x] Doctor Portal
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

              
- [x] Clinical desicion support module
A medical viewer that allow doctor to view DICOM studies of lung cancer disease including many features as:
    - Uploading DICOM studies.
    - Medical viewing.
            - Allow multiple features as Panning, Zooming & Windowing.
            - Classify each slice indepentently into malignant,benign or normal.
            - Provide information about the uploaded study as number of instances Uploaded, study Uid, series Uid and patient name.
            - Show the overall result for the uploaded study.
            - Specifically define the slices including malignant or benign tumors.
            
### Technologies
- [x] System
    - Front-end: React native with typescript
    - Back-end: NodeJs with typescript
    - Database: mongoDB
     
- [x] Deep learning model
    - Used MobileNet pre-trained model with a Softmax output layer for classification.
    - Model input: DICOM image pixel array
    - Model output: class with the highest probability from Softmax layer
     
### How to run the project

### Demos

### Contributors
<a href="https://github.com/1brahimmohamed">
  <img src="https://avatars.githubusercontent.com/1brahimmohamed"/>
</a>

<a href="https://github.com/mahamedhat">
  <img src="https://avatars.githubusercontent.com/mahamedhat" />
</a>

<a href="https://github.com/AmeeraMOhammed">
  <img src="https://avatars.githubusercontent.com/AmeeraMOhammed" />
</a>

<a href="https://github.com/doha-eid">
  <img src="https://avatars.githubusercontent.com/doha-eid" />
</a>

<a href="https://github.com/mayekhaled0">
  <img src="https://avatars.githubusercontent.com/mayekhaled0" />
</a>
    
      
### Submitted to:
Dr Eman Ayman & Eng. Yara Wael
All rights reserved © 2024 to Mdima team (Systems & Biomedical Engineering, Cairo University Class 2024)


