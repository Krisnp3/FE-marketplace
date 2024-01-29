import styles from './AnalyticsPage.module.css';
import Carousel from '../../../components/Carousel/Carousel';
import { useEffect, useRef, useState } from 'react';
import Tokopedia from '../../../helper/Tokopedia/TokopediaHelper';

export default function AnalyticsPage({isComparing, marketplace = "tokopedia"}) {

    const containerRef = useRef(null);
    const [containerScale, setContainerScale] = useState(1);
    const [carouselHeight, setCarouselHeight] = useState(1);

    const [marketplaceHelper, setMarketplaceHelper] = useState(null);
    const [carouselTitle, setCarouselTitle] = useState([]);
    const [carouselChildren, setCarouselChildren] = useState([]);

    const [onScrollCarousel, setOnScrollCarousel] = useState([]);
    const [curPage, setCurPage] = useState(0);

    useEffect(() => {
        onresize();
        window.addEventListener('resize', onresize);
        // containerRef.addEventListener
        setMarketplaceTitles();
    }, [])

    useEffect(() => {
        onresize()
    }, [isComparing])

    useEffect(() => {
        if (marketplaceHelper) {
            console.log("marketplace: ", marketplaceHelper)
            setCarouselTitle(marketplaceHelper.labels);
            setCarouselChildren(marketplaceHelper.getData({}, onScrollUpdate, curPage));
        }
    }, [marketplaceHelper])

    const onScrollUpdate = (onScrollFunc) => {
        let temp = onScrollCarousel;
        if (!temp.includes(onScrollFunc)) {
            temp.push(onScrollFunc);
            setOnScrollCarousel(temp);
        }
    }

    const setMarketplaceTitles = () => {
        switch(marketplace) {
            case 'tokopedia':
                setMarketplaceHelper(Tokopedia);
                break;
            case 'shopee':
                break;
            default:
                console.log("marketplace not available");
                window.alert("marketplace not available")
        }
    }

    const onresize = () => {
        if (containerRef.current) {
            console.log("height: ", containerRef.current.offsetHeight-100)
            if (containerRef.current.offsetWidth < 980) {
                setContainerScale(containerRef.current.offsetWidth/780);
                console.log(containerRef.current.offsetWidth)
            } else {
                setContainerScale(1);
            }

            setCarouselHeight(containerRef.current.offsetHeight)
        }
    }

    return (
        <div className={styles.container} ref={containerRef}>
            <Carousel 
                titles={carouselTitle} 
                width={780*containerScale} 
                height={"calc(100vh - 250px)"} 
                children={carouselChildren}
                onScroll={onScrollCarousel}
                setCarouselPage={setCurPage}
            />
        </div>
    )
}