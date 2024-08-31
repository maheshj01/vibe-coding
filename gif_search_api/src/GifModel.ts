class GifModel {
    id: string;
    title: string;
    url: string;
    images: any;

    constructor(id: string, title: string, url: string, images: any) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.images = images;
    }
}

export default GifModel;