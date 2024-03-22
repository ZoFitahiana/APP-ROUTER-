import React from "react";
import { useUrl } from 'nextjs-current-url';
import { Metadata } from 'next';
import DetailOfPokemon from "../../../../component/server/serverDetail";

export const metadata: Metadata = {
    title: 'Next.js - Coding Beauty',
    description: 'Next.js Tutorials by Coding Beauty',
};

const { pathname } = useUrl() ?? {};
const id = pathname ? pathname.substring(8) : "";



export default function Page() {
    return (
        <div>
            <DetailOfPokemon pokemon={null} id={id} />
        </div>
    );
}