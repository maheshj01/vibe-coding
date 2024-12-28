import React, { forwardRef } from "react";
import ImageModel from "../models/ImageModel";
import { FaDownload, FaThumbsUp } from "react-icons/fa6";
import { handleDownload } from "../utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "./ui/button";

interface GridImageProps {
    image: ImageModel;
    className?: string;
}

const GridImage = forwardRef<HTMLDivElement, GridImageProps>(({ image, className }, ref) => {
    const { regular, small, full } = image.urls;
    const imageUrl = regular || small;
    const downloadUrl = full || regular;
    return (
        <Dialog>
            <div
                ref={ref}
                className={`${className} bg-white rounded-lg shadow-lg overflow-hidden`}>
                <DialogTrigger asChild>
                    <div className="relative group">
                        <img
                            src={imageUrl}
                            alt={image.alt_description}
                            className={"cursor-zoom-in transition-all duration-300 ease-in-out group-hover:filter group-hover:grayscale group-hover:brightness-50"}
                        />
                        {(<div className="absolute bottom-0 text-white opacity-10 group-hover:opacity-100 transition-opacity w-full">
                            <div className="flex p-4 items-center">
                                <div className="flex-grow">
                                    <p className="text-sm font-bold">{image.description || image.alt_description}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="flex gap-1 items-center">
                                        <FaThumbsUp className="inline-block text-white" />
                                        <p className="text-white">{image.likes}</p>
                                    </div>
                                    <FaDownload className="inline-block text-white size-5 font-bold cursor-pointer" onClick={() => handleDownload(downloadUrl)} />
                                </div>
                            </div>
                        </div>)}
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{image.description || "Image Preview"}</DialogTitle>
                        <DialogDescription>
                            Click the download button to save this image.
                        </DialogDescription>
                    </DialogHeader>
                    <img
                        src={downloadUrl}
                        alt={image.alt_description}
                        className={"w-full object-fill"}
                    />
                    <Button onClick={() => handleDownload(downloadUrl)}>Download</Button>
                </DialogContent>
            </div>
        </Dialog>
    );
});

GridImage.displayName = 'GridImage';

export default GridImage;