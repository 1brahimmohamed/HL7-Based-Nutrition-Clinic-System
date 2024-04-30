import HistoryCardHeader from "./HistoryCardHeader.tsx";
import {camelCaseToProperCase, removePlural} from "../../utils/helpers.tsx";
import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updatePatientMedicalHistory} from "../../services/apiPatients.ts";


const separateValues = (values: any[], keys: string[]) => {

    const stringValues = [];
    const objectValues = [];
    const stringKeys = [];
    const objectKeys = [];
    for (let i = 0; i < values.length; i++) {
        if (typeof values[i][0] === "string") {
            stringValues.push(values[i]);
            stringKeys.push(keys[i]);
        } else {
            objectValues.push(values[i]);
            objectKeys.push(keys[i]);
        }
    }
    return [stringKeys, stringValues, objectKeys, objectValues];
}

const MedicalHistory = ({history, patientId}: { history: any, patientId: string }) => {

    const keys = Object.keys(history);
    const values: [][] = Object.values(history);

    // there are two types of values, array of strings and array of objects, we need to handle them differently
    // we need to separete them

    const [stringKeys, stringValues, objectKeys, objectValues] = separateValues(values, keys);

    const queryClient = useQueryClient();

    // Mutation hook for updating patient data
    const {mutate: addItemMutate} = useMutation({
        mutationFn: (updatedHistory: any) => updatePatientMedicalHistory(patientId, updatedHistory),
        onError: (err: Error) => {
            toast.error(err.message, {
                duration: 2500
            });
        },
        onSuccess: () => {
            toast.success('Patient data Updated Successfully', {
                duration: 2500
            });

            queryClient.invalidateQueries({
                queryKey: ['patient', patientId]
            });
        }
    });

    const handleAddItem = (item: string, sectionName: string) => {
        const oldItems = history[sectionName];
        const newItems = [...oldItems, item];

        // update the patient data
        const updatedHistory = {
            ...history,
            [sectionName]: newItems
        };

        // update the patient data in the database
        addItemMutate(updatedHistory);
    }

    const handleDeleteItem = (e: any, item: string, sectionName: string) => {

        // prevent the default behavior of the button
        e.preventDefault();

        const oldItems = history[sectionName];
        const newItems = oldItems.filter((value: string) => value !== item);

        // update the patient data
        const updatedHistory = {
            ...history,
            [sectionName]: newItems
        };

        // update the patient data in the database
        addItemMutate(updatedHistory);
    }


    return (
        <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">

            {stringKeys.map((key: string, index) => (
                <li key={key} className="overflow-hidden rounded-xl border border-gray-200">
                    <HistoryCardHeader sectionName={key} icon={key[0]} onAddItem={handleAddItem}/>

                    {stringValues[index].map((value: string) => (
                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                            <div className="flex justify-between gap-x-4 py-2">
                                <dt className="text-gray-500">{value}</dt>
                                <dd className="text-gray-700"></dd>

                                <button onClick={(e) => handleDeleteItem(e, value, key)}>
                                    <div className={"text-red-800"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                        </svg>
                                    </div>
                                </button>

                            </div>
                        </dl>
                    ))}
                </li>
            ))}

            {objectKeys.map((key: string, index) => (
                <li key={key} className="overflow-hidden rounded-xl border border-gray-200">
                    <HistoryCardHeader sectionName={key} icon={key[0]} onAddItem={handleAddItem}/>

                    {objectValues[index].map((_, valueIndex: number) => (
                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                            <div className="flex justify-between gap-x-4 py-2">
                                <dt className="text-gray-500">{camelCaseToProperCase(removePlural(key))} {valueIndex + 1}</dt>
                                <dd className="text-gray-700"></dd>
                            </div>
                        </dl>
                    ))}
                </li>
            ))}
        </ul>
    );
}

export default MedicalHistory
