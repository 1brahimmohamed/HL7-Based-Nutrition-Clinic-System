import { RouterProvider } from 'react-router-dom';
import router from './router.tsx';
import AuthProvider from 'react-auth-kit';
import authStore from './features/auth/auth-store.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <AuthProvider store={authStore}>
            <QueryClientProvider client={new QueryClient()}>
                <ReactQueryDevtools initialIsOpen={false} />
                <RouterProvider router={router} />
            </QueryClientProvider>
            <Toaster />
        </AuthProvider>
    );
}

export default App;
