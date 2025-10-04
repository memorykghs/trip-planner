import { useImageContext } from './ImageCarousel.jsx';

export default function useImage(tag) {
    const imageMap = useImageContext();
    if (!tag || !imageMap) return null;

    const match = imageMap[tag];
    if (match && match.images && match.images.length > 0) {
        const index = Math.floor(Math.random() * match.images.length);
        return match.images[index];
    }

    return null;
}