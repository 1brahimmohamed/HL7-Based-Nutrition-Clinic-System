import os
import pydicom
from fastapi import FastAPI, UploadFile, File, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from app import processing

file_location = './temp/case.dcm'

# Load your saved model
model = load_model('./models/HISLung_model.h5')

app = FastAPI()

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/predict")
def predict(dicomFile: UploadFile = File(...)):

    print(dicomFile)

    # check if file is empty
    if dicomFile.file is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File is empty"
        )

    # Save the uploaded file
    with open(file_location, 'wb') as f:
        f.write(dicomFile.file.read())

    # # check file type to be dicom by reading it with pydicom
    try:
        pydicom.dcmread(file_location)
    except:
        # Delete the file
        os.remove(file_location)

        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Unsupported media type (not DICOM)"
        )

    # Make prediction
    prediction = processing.classify(file_location, model)
    return {"prediction": prediction}
