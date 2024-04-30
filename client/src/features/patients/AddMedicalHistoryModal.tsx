import React, { useState } from 'react';
import { camelCaseToProperCase} from "../../utils/helpers.tsx";

interface AddMedicalHistoryModalProps {
    onCloseModal: () => void;
    onAddItem: (item: string) => void;
    sectionName: string;
}

const AddMedicalHistoryModal: React.FC<AddMedicalHistoryModalProps> = ({ onCloseModal, onAddItem, sectionName }) => {
    const [item, setItem] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItem(e.target.value);
    };

    const handleAddItem = () => {
        if (item.trim() === '') {
            // Don't add empty item
            return;
        }
        onAddItem(item);
        onCloseModal();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
            {/* Overlay Background */}
            <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="relative bg-white w-1/4 rounded-lg shadow-lg">
                <form className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Add {camelCaseToProperCase(sectionName)}</h2>

                    {/* Input field for item */}
                    <input
                        type="text"
                        value={item}
                        onChange={handleInputChange}
                        placeholder={`Enter ${camelCaseToProperCase(sectionName)}`}
                        className="w-full border rounded-md px-3 py-2 mb-4"
                    />

                    <div className="flex justify-end">
                        {/* Add button */}
                        <button
                            type="button"
                            onClick={handleAddItem}
                            className="block rounded-md bg-secondary-light px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add
                        </button>
                        {/* Cancel button */}
                        <button
                            type="button"
                            onClick={onCloseModal}
                            className="ml-3 block rounded-md bg-gray-200 px-3 py-2 text-center text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMedicalHistoryModal;
