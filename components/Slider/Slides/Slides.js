import React from 'react'
import styles from '../../../styles/Slides.module.css'
const Slides=(props)=>{
    return(
        <>
            <div className={`${styles.sliderImage} ${props.styles}`}>
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <h3>Hello</h3>
                                </div>
                                <div className={styles.cardBody}>
                                    Order your pizza
                                </div>
                            </div>
            </div>
        </>
    )
}
export default Slides