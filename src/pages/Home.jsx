import React from 'react'
import { useLoaderData } from 'react-router-dom'

export default function Home() {
    const data = useLoaderData();
    return (
        <div className="text-center mt-4">
            <h1>Home</h1>
            <p>Message from loader: {data}</p>
        </div>
    )
}
