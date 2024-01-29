import { useEffect, useRef, useState } from 'react';
import styles from './Carousel.module.css';

export default function Carousel({children, titles, width, height, style, onScroll = [], setCarouselPage}) {
    const [curPage, setCurPage] = useState(0);
    const [carouselScale, setCarouselScale] = useState(1);
    const pageContainerRef = useRef(null);



    useEffect(() => { 
        // upadateHeight();
        // let pageHeight = parseInt(pageContainerRef.current.style.height.split('px')[0]);
        // pageContainerRef.current.style.maxScrollPosition = pageHeight - pageContainerRef.current.offsetHeight;
        // setCurPage(0)
        
        
        pageContainerRef.current.addEventListener('scroll', (e) => {console.log("onScrollRef", e); scrollFunction()})
    }, [])

    useEffect(() => {
        setCarouselPage(curPage);
        console.log("height change, ", pageContainerRef.current.children[0].children, curPage, pageContainerRef.current.children[0].children[curPage])

        upadateHeight();
    }, [curPage])

    const upadateHeight = () => {
        if (pageContainerRef.current && pageContainerRef.current.children[0].children[curPage]) {
            console.log("height change 2", pageContainerRef.current.children[0].children[curPage].offsetHeight)
            pageContainerRef.current.children[0].style.height = `${pageContainerRef.current.children[0].children[curPage].offsetHeight + 30}px`;
        } else {
            setTimeout(() => {
                upadateHeight();
            }, 500);
        }
    }


    const scrollFunction = () => {
        let scroll = pageContainerRef.current.scrollTop;
        // console.log("onscrollFuncs", onScroll)
        // console.log("page:", curPage)
        // onScroll[curPage](scroll, curPage);

        for (let i = 0 ; i < onScroll.length; i++) {
            onScroll[i](scroll, curPage);
        }
    }

    const onClickTitle = (page) => {
        setCurPage(page);
        if (pageContainerRef.current) {
            pageContainerRef.current.scrollTop = 0;
        }
    }

    return (
        <div className={`${styles.carouselContainer}`} style={{width: width, height: children[curPage]?.height+"px", ...style}}>
            <div className={`${styles.carouselTitleContainer}`}>
                {titles.map((e, index) => {
                    return (
                        <div className={`${styles.carouselTitle} ${curPage==index? styles.carouselTitleSelected: ''}`}
                            onClick={() => {onClickTitle(index)}}
                            style={{width: `${width/titles.length}px`}}
                        >
                            {e}    
                        </div>
                    )
                })}
                <div className={`${styles.line}`} 
                    style={{
                        left: `${((((curPage)*2)+1) * width/(titles.length*2))- width/(titles.length*4)}px`, 
                        width: `${width/(titles.length*2)}px`,
                        
                    }}
                    
                />
            </div>
            <div className={`${styles.carouselPageContainer}`} style={{maxHeight:height}} ref={pageContainerRef}>
                <div className={`${styles.carouselPageContainer}`} style={{marginLeft: (-curPage * width)+"px", overflow: 'hidden'}}>
                    {children.map((e, index) => {
                        return (
                            <div className={`${styles.carouselPage}`} style={{width: width}}>
                                {e}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}