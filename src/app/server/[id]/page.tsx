"use client"
import React from "react";
import { useUrl } from 'nextjs-current-url';
import DetailOfPokemon from "../../../../component/server/serverDetail";

const Page: React.FC = () => {
    const { pathname } = useUrl() ?? {};
    const id = pathname ? pathname.substring(8) : "";

    return (
        <div>
            <DetailOfPokemon pokemon={null} id={id} />
        </div>
    );
}

export default Page;
