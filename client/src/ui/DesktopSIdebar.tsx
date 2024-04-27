import {Cog6ToothIcon} from "@heroicons/react/24/outline";
import {classNames} from "../utils/helpers.tsx";
import {Link, useLocation} from "react-router-dom";

type TDesktopSidebarProps = {
    navigation: any[],
}

const DesktopSidebar = ({navigation}: TDesktopSidebarProps) => {

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-secondary-light px-6 pb-4">
                <div className="flex h-24 shrink-0 items-center">
                    <img
                        className="h-12 w-auto"
                        src="/images/brand/logo-full-icon-right-white.png"
                        alt="Your Company"
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
                                                    item.href === currentPath ?
                                                        'text-white' : 'text-common-light group-hover:text-white',
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
                                to="settings"
                                className={classNames(
                                    '/settings' === currentPath
                                        ? 'bg-secondary-dark text-white'
                                        : 'text-common-light hover:text-white hover:bg-secondary-dark hover:opacity-85',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}>
                                <Cog6ToothIcon
                                    className={classNames(
                                        '/settings' === currentPath ?
                                            'text-white' : 'text-common-light group-hover:text-white',
                                        'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                />
                                Settings
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default DesktopSidebar
