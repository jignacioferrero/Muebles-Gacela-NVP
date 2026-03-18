import React, { useEffect } from 'react';

interface ScrollToTopProps {
    view: string;
    selectedProductId?: string | number | null;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ view, selectedProductId }) => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [view, selectedProductId]);

    return null;
};

export default ScrollToTop;
