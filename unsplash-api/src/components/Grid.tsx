import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import ImageModel from '../models/ImageModel';
import { RootState } from '../redux/store';
import GridImage from './GridImage';

interface ImagesGridProps {
    className?: string;
    imageRef?: (element: HTMLDivElement | null) => void;
}

const ImagesGrid: React.FC<ImagesGridProps> = memo(({ className, imageRef }) => {
    const images = useSelector((state: RootState) => state.images as ImageModel[]);
    const loading = useSelector((state: RootState) => state.loading);
    if (!images.length) {
        return (
            <div className="flex justify-center items-center h-96">
                <p className="text-gray-500">No images found</p>
            </div>
        );
    }

    const LoadingComponent = () => {
        return (<div className="flex justify-center items-center h-96">
            <div className="loader">Loading...</div>
        </div>)
    }

    return (
        <div className={`grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${className ?? ''}`}>
            {images.map((image: ImageModel, index: number) => (
                <GridImage
                    ref={index === images.length - 1 ? imageRef : undefined}
                    key={image.id}
                    image={image}
                />
            ))}
            {loading && <LoadingComponent />}
        </div>
    );
});

ImagesGrid.displayName = 'ImagesGrid';

export default ImagesGrid;