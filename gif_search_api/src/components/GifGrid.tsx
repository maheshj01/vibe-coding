import React from "react";
import GifModel from "../GifModel";
import GifCard from "./GifCard";

import { useSelector } from "react-redux";
import { RootState } from "../features/gifStore";

const GifGrid: React.FC = () => {
    const gifs = useSelector((state: RootState) => state.gifs as GifModel[]);
    return (
        <div className='px-4'>
            <div className="grid grid-cols-3 gap-4">
                {gifs.map((gif: GifModel) => (
                    <GifCard key={gif.id} gif={gif} />
                ))}
            </div>
        </div>
    )
}

export default GifGrid;