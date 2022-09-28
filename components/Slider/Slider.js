import React, { useState } from 'react'
import styles from '../../styles/Slider.module.css'
import Slides from './Slides/Slides'
const Slider=()=>{
    const [sliderCounter, setSliderCounter] = useState(0)
    
    const previousHandler=()=>{
        if(sliderCounter==0)
        setSliderCounter(1)
        else
            setSliderCounter((prevState)=>prevState-1)
    }
    const nextHandler=()=>{
        if(sliderCounter==1)
            setSliderCounter(0)
        else
        setSliderCounter((prevState)=>prevState+1)
    }
    return(
        <>
            <div className={styles.slider}>
                <div className={styles.leftArrow} onClick={previousHandler}>
                    <div className={styles.prev}>
                            previous
                    </div>
                </div>
                <div className={styles.sliderImages} style={{transform:`translateX(${-100*sliderCounter}vw)`}}>
                    <Slides styles={styles.firstImage}/>
                    {/* <Slides styles={styles.secondImage}/> */}
                </div>
                <div className={styles.rightArrow} onClick={nextHandler}>
                    <div className={styles.next}>
                        next
                    </div>
                </div>
            </div>
        </>
    )
}
export default Slider