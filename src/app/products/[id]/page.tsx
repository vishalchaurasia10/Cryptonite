import React from 'react'

const page = ({ params }: any) => {
    return (
        <div>
            <h1>Product Page</h1>
            <h2>{params.id}</h2>
        </div>
    )
}

export default page
