import React, {useCallback} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import PropTypes from 'prop-types';
import '../styles/embla-carousel.css';

export default function ImageCarousel({images = []}) {
    const [emblaRef, emblaApi] = useEmblaCarousel({loop:true}); // 啟用輪播

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    if (!images || images.length === 0) return null;

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container ">
                    {images.map((img, idx) => (
                        <div className="embla__slide" key={idx}>
                            <img
                                src={img}
                                alt={`image-${idx}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* 箭頭按鈕 */}
            <button className="embla__button embla__button--prev" onClick={scrollPrev}>
                ‹
            </button>
            <button className="embla__button embla__button--next" onClick={scrollNext}>
                ›
            </button>
        </div>
    );
}

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};