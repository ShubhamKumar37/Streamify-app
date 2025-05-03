import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-error">Oops! Page Not Found</h1>
            <p className="mt-2 text-lg">The page you're looking for doesn't exist. It might have been removed, renamed, or it never existed in the first place.</p>
            <button onClick={() => navigate('/')} className="mt-4 btn">Go Home</button>
        </div>
    )
}

export default PageNotFound
