
import GifModel from "../GifModel";
import React from "react";

const GifCard: React.FC<{ gif: GifModel }> = ({ gif }) => {
    console.log(gif.url);
    return (
        <div className="flex flex-col items-center justify-center shadow-md">
            <img src={gif.images.original.url} alt={gif.title} />
            <p className="my-2">{gif.title}</p>
        </div>
    )
}

export default GifCard;