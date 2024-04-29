import HistoryCardHeader from "./HistoryCardHeader.tsx";
import {camelCaseToProperCase, removePlural} from "../../utils/helpers.tsx";


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

const MedicalHistory = ({history}: {history: any}) => {

    const keys = Object.keys(history);
    const values: [][] = Object.values(history);

    // there are two types of values, array of strings and array of objects, we need to handle them differently
    // we need to separete them

    const [stringKeys, stringValues, objectKeys, objectValues] = separateValues(values, keys);

    return (
        <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">

            {stringKeys.map((key: string, index) => (
                <li key={key} className="overflow-hidden rounded-xl border border-gray-200">
                    <HistoryCardHeader sectionName={key} icon={key[0]}/>

                    {stringValues[index].map((value: string) => (
                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                            <div className="flex justify-between gap-x-4 py-2">
                                <dt className="text-gray-500">{value}</dt>
                                <dd className="text-gray-700"></dd>
                            </div>
                        </dl>
                    ))}
                </li>
            ))}

            {objectKeys.map((key: string, index) => (
                <li key={key} className="overflow-hidden rounded-xl border border-gray-200">
                    <HistoryCardHeader sectionName={key} icon={key[0]}/>

                    {objectValues[index].map(() => (
                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                            <div className="flex justify-between gap-x-4 py-2">
                                <dt className="text-gray-500">{camelCaseToProperCase(removePlural(key))} {index}</dt>
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
