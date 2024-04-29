import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import FontAwesome from 'react-fontawesome';
import { Avatar } from '@mui/material';

const statuses = {
    Paid: 'text-green-700 bg-green-50 ring-green-600/20',
    Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
    Overdue: 'text-red-700 bg-red-50 ring-red-600/10'
};
const clients = [
    {
        id: 1,
        name: 'Allergies',
        imageUrl: 'https://tailwindui.com/img/logos/48x48/tuple.svg',
        icon: 'faSuitcaseMedical',
        lastInvoice: ['Strawberries', 'Peanuts', 'Eggs']
    },
    {
        id: 2,
        name: 'Surgeries',
        icon: 'faSuitcaseMedical',
        imageUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
        lastInvoice: ['Knee Replacement', 'Shoulder Replacement', 'Hip Replacement']
    },
    {
        id: 3,
        name: 'Medications',
        imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
        lastInvoice: ['Aspirin', 'Ibuprofen', 'Tylenol']
    },
    {
        id: 4,
        name: 'Medical Conditions',
        imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
        lastInvoice: ['Diabetes', 'High Blood Pressure', 'High Cholesterol']
    },
    {
        id: 5,
        name: 'Medical Tests',
        imageUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
        lastInvoice: ['Blood Test', 'CBC']
    },
    {
        id: 6,
        name: 'InBody Scores',
        imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
        lastInvoice: ['80', '90', '100']
    },
    {
        id: 7,
        name: 'Diet Plans',
        imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
        lastInvoice: ['Low Carb', 'Keto', 'Paleo']
    },
    {
        id: 8,
        name: 'Prescriptions',
        imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
        lastInvoice: ['Lisinopril', 'Metformin', 'Lipitor']
    }
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function MedicalHistory() {
    return (
        <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
            {clients.map((client) => (
                <li key={client.id} className="overflow-hidden rounded-xl border border-gray-200">
                    <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                        <Avatar
                            className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                            alt={client.name}
                        />
                        <div className="text-sm font-medium leading-6 text-gray-900">{client.name}</div>
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
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-50' : '',
                                                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                )}
                                            >
                                                View<span className="sr-only">, {client.name}</span>
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-50' : '',
                                                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                )}
                                            >
                                                Edit<span className="sr-only">, {client.name}</span>
                                            </a>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                    {client.lastInvoice.map((invoice) => (
                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                            <div className="flex justify-between gap-x-4 py-2">
                                <dt className="text-gray-500">{invoice}</dt>
                                <dd className="text-gray-700"></dd>
                            </div>
                        </dl>
                    ))}
                </li>
            ))}
        </ul>
    );
}
