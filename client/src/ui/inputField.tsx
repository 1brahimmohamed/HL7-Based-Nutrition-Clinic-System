interface IInputFieldProps {
    label: string;
    labelFor: string;
    inputId: string;
    inputName: string;
    inputType: string;
    autoComplete?: string;
    isRequired?: boolean;
    className?: string;
    onChange: (event: any) => void;
}

const inputField = ({
                        label,
                        labelFor,
                        inputId,
                        inputName,
                        inputType,
                        autoComplete,
                        isRequired = false,
                        className,
                        onChange
                    }: IInputFieldProps) => {
    return (
        <div>
            <label htmlFor={labelFor}
                   className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={inputId}
                    name={inputName}
                    type={inputType}
                    autoComplete={autoComplete}
                    required={isRequired}
                    className={`block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default inputField;
