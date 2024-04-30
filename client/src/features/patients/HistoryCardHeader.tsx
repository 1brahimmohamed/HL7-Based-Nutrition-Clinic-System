import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { camelCaseToProperCase, classNames, toProperCase } from "../../utils/helpers.tsx";
import { green } from "@mui/material/colors";
import AddMedicalHistoryModal from "./AddMedicalHistoryModal";

interface HistoryCardHeaderProps {
  icon: string;
  sectionName: string;
}

const HistoryCardHeader: React.FC<HistoryCardHeaderProps> = ({ icon, sectionName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  return (
    <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">

        <Avatar sx={{ bgcolor: green[900] }} >
            {toProperCase(icon)}
        </Avatar>


      <div className="text-sm font-medium leading-6 text-gray-900">{camelCaseToProperCase(sectionName)}</div>

      <Menu as="div" className="relative ml-auto">
        <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
          <span className="sr-only">Open options</span>
          <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  onClick={openModal}
                  className={classNames(
                    active ? "bg-gray-50" : "",
                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                  )}
                >
                  Add<span className="sr-only">, {sectionName}</span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  onClick={openModal}
                  className={classNames(
                    active ? "bg-gray-50" : "",
                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                  )}
                >
                  Edit<span className="sr-only">, {sectionName}</span>
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>

      {/* Render the modal */}
      {isModalOpen && <AddMedicalHistoryModal onCloseModal={closeModal} sectionName={sectionName} />}

    </div>
  );
};

export default HistoryCardHeader;
