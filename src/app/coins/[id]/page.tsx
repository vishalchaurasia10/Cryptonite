import React from 'react'
import CoinData from './CoinData'
import type { Metadata } from 'next'

type Props = {
    params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = params.id;

    return {
        title: `${id} | Cryptonite`,
        description: `Welcome to Cryptonite, the best place to track ${id}.`
    };
}

const page = ({ params }: any) => {
    return (
        <div className="w-full lg:flex lg:flex-col justify-center items-center">
            <CoinData id={params.id} />
        </div>
    )
}

export default page