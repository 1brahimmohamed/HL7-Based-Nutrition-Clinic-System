import {createBrowserRouter} from 'react-router-dom';
import NotFound from './ui/404';
import Login from './features/auth/Login';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import MainLayout from './ui/layouts/MainLayout.tsx';
import Logout from './features/auth/Logout.tsx';
import PdfViewer from './features/pdf-viewer/PdfViewer.tsx';
import Appointments from './features/appointments/Appointments.tsx';
import Appointment from './features/appointments/Appointment.tsx';
import Patients from './features/patients/Patients.tsx';
import Patient from './features/patients/Patient.tsx';
import CDSSLayout from "./ui/layouts/CdssLayout.tsx";
import Viewer from "./features/cdss/Viewer.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        // errorElement: <div>error</div>,
        element: <AuthOutlet fallbackPath={'/login'}></AuthOutlet>,
        children: [
            {
                path: '/',
                element: <MainLayout/>,
                children: [
                    {path: '/', element: <Appointments/>},
                    {path: '/patients', element: <Patients/>},
                    {path: '/patients/:id', element: <Patient/>},
                    {path: '/appointments/:id', element: <Appointment/>},
                    {path: '/pdf-viewer', element: <PdfViewer/>},
                    {path: '/settings', element: <div>Settings</div>},
                    {path: '/sign-out', element: <Logout/>}
                ]
            },
            {
                path: '/clinical-decision-support',
                element: <CDSSLayout />,
                children: [
                    {
                        index: true,
                        element: <Viewer />
                    },
                ]
            },

        ]
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '*',
        element: <NotFound/>
    }
]);

export default router;
