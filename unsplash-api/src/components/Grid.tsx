import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import ImageModel from '../models/ImageModel';
import { RootState } from '../redux/store';
import GridImage from './GridImage';
import './Grid.css';

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
        <div
            key={images.length}
            className={`grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${className}`}>
            {images.map((image: ImageModel, index: number) => {
                const width = image.width;
                const height = image.height;
                const aspectRatio = width / height;
                var spanClass = 'col-span-1';
                if (aspectRatio > 1.5) {
                    spanClass = 'col-span-2';
                }
                else if (aspectRatio < 0.75) {
                    spanClass = 'row-span-2';
                }
                else {
                    spanClass = 'col-span-1';
                }
                return (
                    <GridImage
                        key={index}
                        image={image}
                        className={`bg-white rounded-lg shadow-lg overflow-hidden ${spanClass}`}
                        ref={imageRef}
                    />
                );
            })}
            {loading && <LoadingComponent />}
        </div>
    );
});

ImagesGrid.displayName = 'ImagesGrid';

export default ImagesGrid;