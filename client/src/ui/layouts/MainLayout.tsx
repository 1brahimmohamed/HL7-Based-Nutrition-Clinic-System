import { useState } from 'react';
import { FolderIcon, HomeIcon, UsersIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { Outlet } from 'react-router-dom';

import MobileSidebar from '../MobileSidebar.tsx';
import DesktopSidebar from '../DesktopSIdebar.tsx';
import TopBar from '../Topbar.tsx';

const navigation = [
    { name: 'Appointments', href: '/', icon: HomeIcon, current: true },
    { name: 'Patients', href: '/patients', icon: UsersIcon, current: false },
    { name: 'PDF Viewer', href: '/pdf-viewer', icon: FolderIcon, current: false },
    { name: 'Decision Support', href: '/clinical-decision-support', icon: ComputerDesktopIcon, current: false }
];
const userNavigation = [
    { name: 'Your profile', href: '/settings' },
    { name: 'Sign out', href: '/sign-out' }
];

export default function Example() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div>
                {/* Mobile sidebar */}
                <MobileSidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    navigation={navigation}
                />

                {/* Static sidebar for desktop */}
                <DesktopSidebar navigation={navigation} />

                <div className="lg:pl-72">
                    <TopBar setSidebarOpen={setSidebarOpen} userNavigation={userNavigation} />

                    <main className="py-10">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
