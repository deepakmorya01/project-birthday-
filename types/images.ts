export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface ImageCollection {
  teaser: GalleryImage[];
  gallery: GalleryImage[];
  memoryTree: GalleryImage[];
  album: GalleryImage[];
}
