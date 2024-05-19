//@ts-nocheck
import initCornerstone from '../../utils/initCornerstone.js';
import {useState, useEffect, useRef} from 'react';
import CornerstoneViewport from 'react-cornerstone-viewport'
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import Options from "./Options.tsx";
import dicomParser from 'dicom-parser';

initCornerstone();

const initialConfig = {
    activeViewportIndex: 0,
    viewports: [0],
    tools: [
        // Mouse
        {
            name: 'Wwwc',
            mode: 'active',
            modeOptions: {mouseButtonMask: 1},
        },
        {
            name: 'Zoom',
            mode: 'active',
            modeOptions: {mouseButtonMask: 2},
        },
        {
            name: 'Pan',
            mode: 'active',
            modeOptions: {mouseButtonMask: 4},
        },
        'Length',
        'Angle',
        'Bidirectional',
        'FreehandRoi',
        'Eraser',
        // Scroll
        {name: 'StackScrollMouseWheel', mode: 'active'},
        // Touch
        {name: 'PanMultiTouch', mode: 'active'},
        {name: 'ZoomTouchPinch', mode: 'active'},
        {name: 'StackScrollMultiTouch', mode: 'active'},
    ],
    imageIds: [],
    // FORM
    activeTool: 'Wwwc',
    imageIdIndex: 0,
    isPlaying: false,
    frameRate: 1,
}


const Viewer = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dataInformation, setDataInformation] = useState({});
    const [isImageIDs, setIsImageIDs] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [config, setConfig] = useState(initialConfig);

    initialConfig.imageIds = []

    const handleFileInputChange = (event) => {
        for (const file of event.target.files) {
            const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
            const currentFiles = files
            currentFiles.push(file)
            setFiles(currentFiles);
            setConfig((prevconfig) => ({
                ...prevconfig,
                imageIds: [...prevconfig.imageIds, imageId],
            }));
        }

        const file = event.target.files[0]


        const reader = new FileReader();
        reader.onload = () => {
            const arrayBuffer = reader.result;
            const byteArray = new Uint8Array(arrayBuffer);
            const dataSet = dicomParser.parseDicom(byteArray);

            setDataInformation({
                studyInstanceUID: dataSet.string('x0020000d'),
                seriesInstanceUID: dataSet.string('x0020000e'),
                patientName: dataSet.string('x00100010'),
            })
        };

        reader.readAsArrayBuffer(file);

    }


    const handleButtonClick = () => {
        // Trigger click event on the hidden file input
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleClearClick = () => {
        setIsImageIDs(false);
        setConfig(initialConfig);
        setDataInformation({})
        setFiles([])
    }

    useEffect(() => {
        if (config.imageIds.length > 0) {
            setIsImageIDs(true);
        }
    }, [config.imageIds]);

    return (
        <div className={"flex "}>
            <input
                multiple={true}
                type="file"
                accept=".dcm,.jpg"
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={handleFileInputChange}
            />

            <div className={"flex flex-wrap w-2/3 h-[92vh]"}>
                {isImageIDs && config.imageIds && config.viewports.map(viewportIndex => (
                    <div key={viewportIndex} style={{flex: '1', display: 'flex', flexDirection: 'row'}}>
                        <CornerstoneViewport
                            style={{flex: '1', Width: '720px', height: '100%'}}
                            tools={config.tools}
                            imageIds={config.imageIds}
                            imageIdIndex={config.imageIdIndex}
                            isPlaying={config.isPlaying}
                            frameRate={config.frameRate}
                            className={config.activeViewportIndex === viewportIndex ? 'active' : ''}
                            activeTool={config.activeTool}
                            setViewportActive={() => {
                                setConfig((prevconfig) => ({
                                    ...prevconfig,
                                    activeViewportIndex: viewportIndex,
                                }));
                            }}
                        />
                    </div>
                ))}
            </div>

            <div className={"bg-gray-700 w-[1px] my-5"}>

            </div>

            <div className={"h-full w-1/3 "}>
                <Options
                    information={dataInformation}
                    numImages={config.imageIds.length}
                    files={files}
                    onUploadClick={handleButtonClick}
                    onClearClick={handleClearClick}
                />
            </div>

        </div>
    );
}

export default Viewer;
