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
}

const GridImage = forwardRef<HTMLDivElement, GridImageProps>(({ image }, ref) => {
    const { regular, small, full } = image.urls;
    const imageUrl = regular || small;
    const downloadUrl = full || regular;
    return (
        <Dialog>
            <div
                ref={ref}
                className="bg-white rounded-lg shadow-lg overflow-hidden">
                <DialogTrigger asChild>
                    <img
                        src={imageUrl}
                        alt={image.alt_description}
                        className={"w-full h-48 object-cover cursor-pointer"}
                    />
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
                        className={"w-full h-96 object-cover"}
                    />
                    <Button onClick={() => handleDownload(downloadUrl)}>Download</Button>
                </DialogContent>

                {(<div className="flex p-4 justify-between items-center space-x-2">
                    <p className="text-sm font-bold">{image.description || image.alt_description}</p>
                    <div className="flex items-center space-x-1 gap-2">
                        <div className="flex gap-1 items-center">
                            <FaThumbsUp className="inline-block text-gray-600" />
                            <p className="text-gray-600">{image.likes}</p>
                        </div>
                        <FaDownload className="inline-block text-gray-600 size-5 font-bold cursor-pointer" onClick={() => handleDownload(downloadUrl)} />
                    </div>
                </div>)}
            </div>
        </Dialog>
    );
});

GridImage.displayName = 'GridImage';

export default GridImage;