'use client'

import { useState } from "react";
import Card from "./card";
import styles from './carousel.module.css';

export default function Carrousel({ data }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < data.length - 3) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div className={styles.carouselViewport}>
            <div className={styles.carouselInner}>
                {data?.slice(currentIndex, currentIndex + 3).map((card, index) => (
                    <div className={styles.carouselItem} key={index}>
                        <Card data={card}></Card>
                    </div>
                ))}
            </div>
            {data?.length > 3 &&
                <div className={styles.controls}>
                    <button className={styles.arrowButton} onClick={handlePrev}>&lt;</button>
                    <button className={styles.arrowButton} onClick={handleNext}>&gt;</button>
                </div>
            }
        </div>)
}