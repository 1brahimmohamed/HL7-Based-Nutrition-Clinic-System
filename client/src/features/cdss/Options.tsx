import {useState} from 'react';
import {Button} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {predict} from "../../services/apiCdss.ts";
import toast from "react-hot-toast";

type TOptionsProps = {
    information: {
        studyInstanceUID: string;
        seriesInstanceUID: string;
        patientName: string;
    };
    numImages: number;
    onUploadClick: () => void;
    onClearClick: () => void;
    files: File[];
}

const textColorOptions = {
    'malignant': 'text-red-500',
    'benign': 'text-blue-500',
    'normal': 'text-green-500',
}


const Options = ({information, numImages, onUploadClick, onClearClick, files}: TOptionsProps) => {

    console.log(information);
    const [prediction, setPrediction] = useState("");

    const handleModelRun = async () => {
        const res = await predict(files);

        if (res.status === 'success') {
            setPrediction(res.prediction);
        } else {
            toast.error(res.message);
        }
    }

    const textColor = textColorOptions[prediction];


    const handleClear = () => {
        setPrediction("");
        onClearClick();
    }

    return (
        <div className={'text-gray-400 p-3'}>
            <h1 className={'text-4xl'}>Decision Support System</h1>

            <div className={'flex justify-between mt-10 gap-y-3'}>
                <div>
                    <h1 className={'text-2xl'}>Upload</h1>
                    <p>Upload a DICOM file(s)</p>
                </div>

                <Button
                    className={'w-1/4 h-10'}
                    variant="contained"
                    color="primary"
                    size="medium"
                    endIcon={<FileUploadIcon/>}
                    onClick={onUploadClick}
                >
                    Upload
                </Button>
            </div>


            <div className={'flex flex-col mt-10 gap-y-3'}>
                <h1 className={'text-2xl'}>Information</h1>
                <p>Number of Instances Uploaded: {numImages}</p>
                <p>StudyUid: {information.studyInstanceUID}</p>
                <p>SeriesUid: {information.seriesInstanceUID}</p>
                <p>Patient Name: {information.patientName}</p>
            </div>

            <hr className={'mt-10 border-gray-600'}/>

            <div className={'flex flex-col mt-10 gap-y-3'}>
                <h1 className={'text-2xl'}>Diagnose</h1>
                <p>Run AI Model for primary diagnosis</p>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={handleModelRun}
                >
                    Run
                </Button>

                {
                    prediction !== "" && (
                        <div className={'flex text-center flex-col mt-10 gap-y-3'}>
                            <p> The result of ai-model is: <span className={`${textColor}`}>{prediction}</span></p>
                        </div>
                    )
                }

            </div>


            <div className={'flex justify-center mt-20 gap-y-3'}>
                <Button
                    className={'w-1/4 h-10'}
                    variant="contained"
                    color="error"
                    size="medium"
                    onClick={handleClear}
                >
                    Clear Images
                </Button>
            </div>

        </div>
    );
};

export default Options;
