type TPageHeaderProps = {
    title: string;
    description: string;
    isInEditMode: boolean;
    isInEditModeText: string;
    isNotInEditModeText: string;
    saveChangesHandler: () => void;
    editToggle: () => void;
    cancelButtonText?: string;
    cancelButtonHandler?: () => void;
};

const PageHeader = ({
                        title,
                        cancelButtonHandler,
                        cancelButtonText,
                        isInEditModeText,
                        isNotInEditModeText,
                        saveChangesHandler,
                        description,
                        editToggle,
                        isInEditMode
                    }: TPageHeaderProps) => {
    return (
        <div className="sm:flex sm:items-center mb-10">
            <div className="sm:flex-auto">
                <h1 className="text-3xl font-semibold leading-6 text-gray-900">{title}</h1>
                <p className="mt-2 text-sm text-gray-700">{description}</p>
            </div>
            {
                cancelButtonHandler &&
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-red-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={cancelButtonHandler}
                    >
                        {cancelButtonText}
                    </button>
                </div>
            }
            <div className="mt-4 sm:ml-2 sm:mt-0 sm:flex-none">
                <button
                    type="button"
                    onClick={isInEditMode ? saveChangesHandler : editToggle}
                    className="block rounded-md bg-secondary-light px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {isInEditMode ? isInEditModeText : isNotInEditModeText}
                </button>
            </div>
        </div>
    );
};

export default PageHeader;
