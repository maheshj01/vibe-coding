
import React from 'react';
import { useSelector } from 'react-redux';
import ImageModel from '../models/ImageModel';
import { RootState } from '../redux/store';
import GridImage from './GridImage';

const ImagesGrid: React.FC<any> = ({ className }) => {
    const images = useSelector((state: RootState) => state.images as ImageModel[]);
    return (
        <div className={`grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
            {images.map((image: ImageModel) => (
                <GridImage key={image.id} image={image} />
            )
            )}
        </div>
    );
};

export default ImagesGrid;