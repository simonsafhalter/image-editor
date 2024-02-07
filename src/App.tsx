import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CssBaseline from '@mui/material/CssBaseline'
import { router } from './routes'

// Create a query client
const queryClient = new QueryClient()

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}
