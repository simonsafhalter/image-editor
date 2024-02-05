import { createBrowserRouter, Link, Navigate, Outlet } from 'react-router-dom'
import { AppBar, Toolbar } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { ImageEditorPage } from '@/routes/pages/ImageEditorPage'
import { ImageGalleryPage } from './pages/ImageGalleryPage'

const PageLayout = () => (
    <>
        <AppBar>
            <Toolbar>
                <Link to="/">
                    <HomeIcon />
                </Link>
            </Toolbar>
        </AppBar>
        <Outlet />
    </>
)

export const router = createBrowserRouter([
    {
        element: <PageLayout />,
        children: [
            {
                path: '/',
                element: <ImageGalleryPage />,
            },
            {
                path: '/image-editor',
                element: <ImageEditorPage />,
            },
            {
                path: '*',
                element: <Navigate to="/" replace />,
            },
        ],
    },
])
