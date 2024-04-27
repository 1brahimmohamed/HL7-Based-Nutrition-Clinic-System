import React, { useState } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import MedicalHistory from "./MedicalHistory.tsx";

export default function Patient() {
    const [editMode, setEditMode] = useState(false);

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center mb-10">
                <div className="sm:flex-auto">
                    <h1 className="text-3xl font-semibold leading-6 text-gray-900">Your Patient</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A detailed view of this patient.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-red-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        // onClick={}
                    >
                        Delete Patient
                    </button>
                </div>
                <div className="mt-4 sm:ml-2 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        onClick={handleEditToggle}
                        className="block rounded-md bg-secondary-light px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {editMode ? "Save Changes" : "Edit Patient"}
                    </button>
                </div>
            </div>
            <form>

            <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <span className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6">Hima</span>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <span className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6">Mohamed</span>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <span className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6">XwP0H@example.com</span>
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone Number
                                </label>
                                <div className="mt-2">
                                    <span className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6">+1 555-555-5555</span>
                                </div>
                            </div>
                            <div className="sm:col-span-5">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Address
                                </label>
                                <div className="mt-2">
                                    <span className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6">123 Main St dsfasdf safsdfqwer wfwef</span>
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Gender
                                </label>
                                <div className="mt-2">
                                    <span className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6">Male</span>
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Age
                                </label>
                                <div className="mt-2">
                                    <span className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6">22</span>
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Job
                                </label>
                                <div className="mt-2">
                                    <span className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6">Engineer</span>
                                </div>
                            </div>
                        </div>
                        </div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 mb-10 sm:grid-cols-6">
                        <h2 className="sm:col-span-6 text-base font-semibold leading-7 text-gray-900">InBody Test Results</h2>
                        <div className="sm:col-span-1">
                            <label htmlFor="score" className="block text-sm font-medium leading-6 text-gray-900">
                                Score
                            </label>
                            <div className="mt-2">
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="score"
                                        id="score"
                                        className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                                        defaultValue="10"
                                    />
                                ) : (
                                    <span className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6">10</span>
                                )}
                            </div>
                        </div>
                        <div className="sm:col-span-1">
                            <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-900">
                                Weight
                            </label>
                            <div className="mt-2">
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="weight"
                                        id="weight"
                                        className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                                        defaultValue="20"
                                    />
                                ) : (
                                    <span className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6">20</span>
                                )}
                            </div>
                        </div>
                        <div className="sm:col-span-1">
                            <label htmlFor="weight-control" className="block text-sm font-medium leading-6 text-gray-900">
                                Weight Control
                            </label>
                            <div className="mt-2">
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="weight-control"
                                        id="weight-control"
                                        className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                                        defaultValue="30"
                                    />
                                ) : (
                                    <span className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6">30</span>
                                )}
                            </div>
                        </div>
                        <div className="sm:col-span-1">
                            <label htmlFor="target-weight" className="block text-sm font-medium leading-6 text-gray-900">
                                Target Weight
                            </label>
                            <div className="mt-2">
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="target-weight"
                                        id="target-weight"
                                        className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                                        defaultValue="40"
                                    />
                                ) : (
                                    <span className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6">40</span>
                                )}
                            </div>
                        </div>
                        <div className="sm:col-span-1">
                            <label htmlFor="fat" className="block text-sm font-medium leading-6 text-gray-900">
                                Fat
                            </label>
                            <div className="mt-2">
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="fat"
                                        id="fat"
                                        className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                                        defaultValue="100"
                                    />
                                ) : (
                                    <span className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6">100</span>
                                )}
                            </div>
                        </div>
                        <div className="sm:col-span-1">
                            <label htmlFor="muscle" className="block text-sm font-medium leading-6 text-gray-900">
                                Muscle
                            </label>
                            <div className="mt-2">
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="muscle"
                                        id="muscle"
                                        className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                                        defaultValue="80"
                                    />
                                ) : (
                                    <span className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm sm:text-sm sm:leading-6">80</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Medical History</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Patients Medical information.</p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 mb-10 sm:grid-cols-6">
                            {/* Your medical history input fields here */}
                        </div>
                        <MedicalHistory/>
                    </div>
                </div>
                {/* <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-secondary-light px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div> */}
            </form>
        </div>
    );
}
