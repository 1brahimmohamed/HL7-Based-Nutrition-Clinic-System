import {Avatar} from "@mui/material";
import React, {useState} from "react";
import {Menu, Transition} from "@headlessui/react";
import {EllipsisHorizontalIcon} from "@heroicons/react/20/solid";
import {Fragment} from "react";
import {camelCaseToProperCase, classNames, toProperCase} from "../../utils/helpers.tsx";
import {green} from "@mui/material/colors";
import AddMedicalHistoryModal from "./AddMedicalHistoryModal";

interface HistoryCardHeaderProps {
    icon: string;
    sectionName: string;
    onAddItem: (item: string, sectionName: string) => void;
}

const HistoryCardHeader: React.FC<HistoryCardHeaderProps> = ({icon, sectionName, onAddItem}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div className="flex items-center justify-between gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">

            <div className={"flex gap-x-4 items-center"}>
                <Avatar sx={{bgcolor: green[900]}}>
                    {toProperCase(icon)}
                </Avatar>


                <div className="text-sm font-medium leading-6 text-gray-900">{camelCaseToProperCase(sectionName)}</div>
            </div>

            <button
                type="button"
                onClick={openModal}
                className={"block py-1 text-sm leading-6 text-gray-400 "}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>

            </button>

            {/* Render the modal */}
            {isModalOpen &&
                <AddMedicalHistoryModal onCloseModal={closeModal} sectionName={sectionName} onAddItem={onAddItem}/>}

        </div>
    );
};

export default HistoryCardHeader;
