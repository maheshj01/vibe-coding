import React, { forwardRef } from "react";
import ImageModel from "../models/ImageModel";
import { FaThumbsUp } from "react-icons/fa6";

interface GridImageProps {
    image: ImageModel;
}

const GridImage = forwardRef<HTMLDivElement, GridImageProps>(({ image }, ref) => {
    const imageUrl = image.urls.regular || image.urls.small;
    return (
        <div
            ref={ref}
            className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
                src={imageUrl}
                alt={image.alt_description}
                className="w-full h-48 object-cover"
            // loading="lazy" // Add lazy loading for better performance
            />
            <div className="flex p-4 justify-between items-center space-x-2">
                <p className="text-sm font-bold">{image.description || image.alt_description}</p>
                <div className="flex items-center space-x-1">
                    <FaThumbsUp className="inline-block text-gray-600" />
                    <p className="text-gray-600">{image.likes}</p>
                </div>
            </div>
        </div>
    );
});

GridImage.displayName = 'GridImage';

export default GridImage;