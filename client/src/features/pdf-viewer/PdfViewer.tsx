import {useState} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();


type PDFFile = string | File | null;

const PdfViewer = () => {

    const [file, setFile] = useState<PDFFile>(null);

    const [numPages, _] = useState(1);


    function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const {files} = event.target;

        if (files && files[0]) {
            setFile(files[0] || null);
        }
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-3xl font-semibold leading-6 text-gray-900">Pdf Viewer</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        You can upload a pdf file and view it here.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <input
                        id={"input file"}
                        onChange={onFileChange}
                        type="file"
                        className={"hidden"}
                    />
                    <button
                        onClick={() => document.getElementById("input file")?.click()}
                        type="button"
                        className="block rounded-md bg-secondary-light px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Upload Pdf
                    </button>
                </div>
            </div>
            <div className={"flex justify-center w-full"}>
                {
                    file && (
                        <Document file={file}>
                            {
                                Array.from(
                                    new Array(numPages),
                                    (el, index) => (
                                        <Page
                                            key={`page_${index + 1}`}
                                            pageNumber={index + 1}
                                        />
                                    ),
                                )
                            }
                        </Document>
                    )
                }
            </div>
        </div>
    );
}

export default PdfViewer;
