import { Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const Options = ({ information, numImages, onUploadClick, onClearClick }) => {

    console.log(information);

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
                    endIcon={<FileUploadIcon />}
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

            <hr className={'mt-10 border-gray-600'} />

            <div className={'flex flex-col mt-10 gap-y-3'}>
                <h1 className={'text-2xl'}>Diagnose</h1>
                <p>Run AI Model for primary diagnosis</p>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                >
                    Run
                </Button>

                <div className={'flex justify-center'}>
                    <p>Result: <span className={'text-red-600'}> El Bakat Llah </span></p>
                </div>

            </div>


            <div className={'flex justify-center mt-20 gap-y-3'}>
                <Button
                    className={'w-1/4 h-10'}
                    variant="contained"
                    color="error"
                    size="medium"
                    onClick={onClearClick}
                >
                    Clear Images
                </Button>
            </div>

        </div>
    );
};

export default Options;
