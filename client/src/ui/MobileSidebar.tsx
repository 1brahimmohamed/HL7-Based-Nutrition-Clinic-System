import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {Cog6ToothIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {classNames} from "../utils/helpers.tsx";
import {Link, useLocation} from "react-router-dom";

type TMobileSidebarProps = {
    sidebarOpen: boolean,
    setSidebarOpen: (open: boolean) => void,
    navigation: any[],
}

const MobileSidebar = ({sidebarOpen, setSidebarOpen, navigation}: TMobileSidebarProps) => {

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className={"relative z-50 lg:hidden"} onClose={setSidebarOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900/80" />
                </Transition.Child>

                <div className="fixed inset-0 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>
                            {/* Sidebar component, swap this element with another sidebar if you like */}
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-secondary-light px-6 pb-4">
                                <div className="flex h-24 shrink-0 items-center">
                                    <img
                                        className="h-14 w-auto"
                                        src="/images/brand/logo-full-icon-right-white.png"
                                        alt="MDIMA"
                                    />
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <Link
                                                            to={item.href}
                                                            className={classNames(
                                                                item.href === currentPath
                                                                    ? 'bg-secondary-dark text-white'
                                                                    : 'text-common-light hover:text-white hover:bg-secondary-dark hover:opacity-85',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                            )}
                                                        >
                                                            <item.icon
                                                                className={classNames(
                                                                    item.href === currentPath
                                                                        ? 'text-white' : 'text-common-main group-hover:text-white',
                                                                    'h-6 w-6 shrink-0'
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className="mt-auto">
                                            <Link
                                                to="/settings"
                                                className={classNames(
                                                    '/settings' === currentPath
                                                        ? 'bg-secondary-dark text-white'
                                                        : 'text-common-light hover:text-white hover:bg-secondary-dark hover:opacity-85',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                )} >
                                                <Cog6ToothIcon
                                                    className={classNames(
                                                        '/settings' === currentPath ?
                                                            'text-white' : 'text-common-light group-hover:text-white',
                                                        'h-6 w-6 shrink-0'
                                                    )}                                                    aria-hidden="true"
                                                />
                                                Settings
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default MobileSidebar
