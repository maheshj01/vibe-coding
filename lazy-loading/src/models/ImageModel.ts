class ImageModel {
    id: string;
    urls: URLS;
    description: string;
    alt_description: string;
    likes: number;

    constructor(id: string, urls: URLS, description: string, alt_description: string, likes: number) {
        this.id = id;
        this.urls = urls;
        this.description = description;
        this.alt_description = alt_description;
        this.likes = likes;
    }
}

class URLS {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;

    constructor(raw: string, full: string, regular: string, small: string, thumb: string, small_s3: string) {
        this.raw = raw;
        this.full = full;
        this.regular = regular;
        this.small = small;
        this.thumb = thumb;
        this.small_s3 = small_s3;
    }
}

export default ImageModel;