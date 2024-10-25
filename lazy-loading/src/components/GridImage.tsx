import React from "react";
import ImageModel from "../models/ImageModel";
import { FaThumbsUp } from "react-icons/fa6";

const GridImage: React.FC<{ image: ImageModel }> = ({ image }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={image.urls.full} alt={image.alt_description} className="w-full h-48 object-cover" />
            <div className="flex p-4 justify-between items-center space-x-2">
                <p className="text-sm font-bold">{image.description}</p>

                <div className="flex items-center space-x-1">
                    <FaThumbsUp className="inline-block text-gray-600" />
                    <p className="text-gray-600"> {image.likes}</p>
                </div>
            </div>
        </div>
    );
};

export default GridImage;