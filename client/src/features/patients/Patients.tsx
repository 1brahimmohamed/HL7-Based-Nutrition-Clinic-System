import {getAllPatients} from '../../services/apiPatients.ts';
import {useNavigate} from 'react-router-dom';
import {useQuery} from "@tanstack/react-query";
import Loading from "../../ui/Loading.tsx";
import {IPatient} from "../../types/user";
import TableHeader from "../../ui/TableHeader.tsx";
import PageHeaderWithButton from "../../ui/PageHeaderWithButton.tsx";
import {useState} from "react";
import AddPatientModal from "./AddPatientModal.tsx";

const tableHeaderNames = ['Name', 'Phone Number', 'Email', 'Age', 'Gender', 'Job']


const Patients = () => {

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const {data: patients, isLoading} = useQuery({
        queryKey: ['patients'],
        queryFn: getAllPatients
    });

    if (isLoading) {
        return <Loading/>;
    }


    return (
        <div className="px-4 sm:px-6 lg:px-8">

            <PageHeaderWithButton
                title={'Patients'}
                description={'A list of all the patients that is assigned to you including their name, title, email and role.'}
                buttonText={'Add Patient'}
                buttonOnClick={() => setShowModal(true)}
            />

            {/* Modal for adding appointment */}
            {showModal && <AddPatientModal onCloseModal={() => setShowModal(false)}/>}

            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <TableHeader columnsNames={tableHeaderNames} hasEdit={true}/>

                            <tbody className="divide-y divide-gray-200">
                            {patients.map((patient: IPatient) => (
                                <tr
                                    key={patient.phoneNumber}
                                    onClick={() => navigate(`/patients/${patient._id}`)}
                                >
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        {patient.fullName}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {patient.phoneNumber}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {patient.email}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {patient.age}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {patient.gender}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {patient.job}
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <a href="#" className="text-primary-dark hover:text-primary-main">
                                            Edit<span className="sr-only">, {patient.firstName}</span>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Patients;
