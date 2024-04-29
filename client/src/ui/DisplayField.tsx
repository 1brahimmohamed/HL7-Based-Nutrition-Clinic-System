
type TDisplayFieldProps = {
    label: string;
    value: string;
    isEditable?: boolean;
    isInEditMode?: boolean;
    labelFor?: string;
    inputId?: string;
    inputName?: string;
    inputType?: string;
    containerClassName?: string;
    className?: string;
    defaultInputValue?: string;
}

const DisplayField = ({
                          label,
                          value,
                          isEditable = false,
                          isInEditMode = false,
                          labelFor,
                          inputId,
                          inputName,
                          inputType,
                          containerClassName,
                          className,
                      }: TDisplayFieldProps) => {


    if (!isEditable) {
        return (
            <div className={`${containerClassName? containerClassName : "sm:col-span-2"} `}>
                <label
                    htmlFor={labelFor}
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {label}
                </label>
                <div className="mt-2">
                    <span
                        className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6">
                         {value || "_"}
                    </span>
                </div>
            </div>
        )
    }

    return (
        <div className={`sm:col-span-1 ${containerClassName}`}>
            <label
                htmlFor={labelFor}
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <div className="mt-2">
                {isInEditMode ? (
                    <input
                        type={inputType}
                        name={inputName}
                        id={inputId}
                        value={value}
                        className={`block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6 ${className}`}
                        defaultValue="10"
                    />
                ) : (
                    <span
                        className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6">
                        {value || "_"}
                    </span>
                )}
            </div>
        </div>
    )
}

export default DisplayField;
