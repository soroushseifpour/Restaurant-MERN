import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Pagination.module.css'
let START=false;
const Pagination=(props)=>{
    const [pages, setPages] = useState([])    
    useEffect(() => {
        if(START==false){
            let page=[]
            for (let index = 0; index < props.pagenumbers; index++) {
                page.push(index+1)   
            }
            setPages(page)
        }
        else
        START=true
    }, [])
    return(
        <>
        <div className={styles.pagination}>
            <a href="#">&laquo;</a>
            {
                pages.length > 0 ? pages.map((p,i)=>{
                    return(
                        <>
                        <div onClick={()=>props.pagination(p)} className={props.currentPage===p ? `${styles.active}` : ''}>{p}</div>
                        </>
                    )
                }) : <>loading</>
            }   
            <a href="#">&raquo;</a>
        </div>
        </>
    )
}
export default Pagination