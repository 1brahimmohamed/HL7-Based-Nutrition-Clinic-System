import React from 'react';

type TEditableFieldProps = {
    label: string;
    value: string;
    isEditable: boolean;
    editMode?: boolean;
    children?: React.ReactNode;
};

const EditableField = ({ label, value, isEditable, editMode, children }: TEditableFieldProps) => {
    if (!isEditable) {
        return (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">{label}</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{value}</dd>
            </div>
        );
    }

    return (
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">{label}</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {editMode ? children : value}
            </dd>
        </div>
    );
};

export default EditableField;
