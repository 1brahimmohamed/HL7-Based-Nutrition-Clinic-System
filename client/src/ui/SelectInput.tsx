import React from "react";

type TSelectInputProps = {
    label: string;
    labelFor: string;
    selectId: string;
    selectName: string;
    defaultOption: string;
    className: string;
    containerClassName: string;
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    children: React.ReactNode;

}

const SelectInput = ({
                         label,
                         labelFor,
                         selectId,
                         selectName,
                         defaultOption,
                         className,
                         containerClassName,
                         value,
                         onChange,
                         children
                     }: TSelectInputProps) => {

    return (
        <div className={containerClassName}>
            <label
                htmlFor={labelFor}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <select
                id={selectId}
                name= {selectName}
                value={value}
                onChange={onChange}
                className={`block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-main-600 sm:text-sm sm:leading-6 ${className}`}
            >
                <option value="">{defaultOption}</option>
                {children}
            </select>
        </div>
    )
}

export default SelectInput;
