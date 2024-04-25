import {RouterProvider} from "react-router-dom";
import router from "./router.tsx"
import AuthProvider from 'react-auth-kit';
import authStore from './features/auth/auth-store.ts';

function App() {
    return (
        <AuthProvider store={authStore}>
            <RouterProvider router={router} />
        </AuthProvider>
    )
}
export default App
