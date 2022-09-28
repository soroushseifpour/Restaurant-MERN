import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gettingSingleProduct, productActions } from '../../store/productReducer'
import styles from '../../styles/SingleProduct.module.css'
const SingleProduct=({pizz})=>{
    const pizza=pizz
    const [price, setPrice] = useState(pizz.price[0])
    const user=useSelector(state=>state.user).user;
    const [sizes, setSizes] = useState([
        {info:"small",class:[styles.smallsize],classDisplay:styles.display},
        {info:"medium",class:[styles.mediumsize]},
        {info:"large",class:[styles.largesize]},
    ])
    const [selectedSize, setSelectedSize] = useState(pizz.price[0])
    const [extraOptionPrice, setExtraOptionPrice] = useState(0)
    const [extraOptions, setExtraOptions] = useState([])
    const [count, setCount] = useState(1)
    const dispatch=useDispatch();
    useEffect(() => {
        calculatingPrice();
    }, [selectedSize,extraOptionPrice,count])
    const changingSize=(e,i)=>{
        const element=e.currentTarget;
        const els=document.querySelectorAll(`.${styles.sizeList} li`);
        els.forEach((el)=>el.classList.remove(`${styles.display}`));
        element.classList.add(`${styles.display}`)
        setSelectedSize(pizz.price[i])
    }
    const calculatingPrice=()=>{
        const price=(selectedSize+extraOptionPrice)*count;
        setPrice(price);
    }
    const extraOptionHandler=(e,ext,info)=>{
        // console.log(e.currentTarget.checked,ext)
        const checked=e.currentTarget.checked;
        if(checked){
            console.log(info)
            let newExtraOptions=[...extraOptions]
            newExtraOptions.push(info)
            setExtraOptions(newExtraOptions)
            setExtraOptionPrice(prevState=>prevState+ext)
        }
        else if(extraOptionPrice >0 && !checked){
            const extraIndex=extraOptions.findIndex(p=>p===info)
            const extraOption=extraOptions[extraIndex];
            const newExtraOptions=extraOptions.filter(p=>p!==extraOption);
            setExtraOptions(newExtraOptions);
            setExtraOptionPrice(prevState=>prevState-ext)
        }
    }
    const addingToCartHandler=()=>{
        // console.log()
        const order={
            id:pizz.name,
            name:pizz.name,
            extraOptions:extraOptions,
            price:price/count,
            count:count
        };
        console.log(order)
        dispatch(productActions.addToCart(order))
    }
    return(
        <>
           
            <div className={styles.container}>
                <h1>Pizza Detail</h1>
            <div className={styles.pizzacontainer}> 
            <div className={styles.leftColumn}>
                    <div className={styles.imageleft}>
                        <Image src='/pizza.png' layout="responsive" width={500} height={500}/>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.card}>
                        <h3>Pizza Name</h3>
                        <p style={{textAlign:"center"}}>{pizza.name.toUpperCase()}</p>
                        <div className={styles.cardBody}>
                            <h3>Basic Ingredients</h3>
                            <div className={styles.ingredients}>
                                <ul className={styles.ingredientList}>
                                    {pizza.ingredients.map((i)=>{
                                        return(
                                            <>
                                                <li>{i}</li>
                                            </>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className={styles.size}>
                                <h3>Pizza Sizes</h3>
                                 <ul className={styles.sizeList}>
                                    {sizes.map((size,i)=>{
                                        return(
                                            <>
                                                <li className={`${styles.sizeItem} ${size.classDisplay}`} onClick={(e)=>changingSize(e,i)}>
                                                    <span className={styles.sizeInfo}>{size.info}</span>
                                                    <span className={size.class.join(' ')}>
                                                        <Image src='/size.png' layout='responsive' height={500} width={500}/>
                                                    </span>
                                                </li> 
                                            </>       
                                        )
                                    })}   
                                 </ul>   
                            </div>
                            <div className={styles.extras}>
                                <h3>Extra Ingredients</h3>
                                <ul className={styles.extraList}>
                                    {Object.keys(pizza.extraOptiopn).map((option,i)=>{
                                        return(
                                            <>
                                                 <li className={styles.extraItem} key={i}>
                                                    <input type={'checkbox'} className={styles.inputcheckbox} onChange={(e)=>extraOptionHandler(e,pizza.extraOptiopn[`${option}`],option)}/>
                                                    <span className={styles.ingredient}>{option}</span>
                                                </li>
                                            </>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className={styles.cardFooter}>
                            <span style={{fontWeight:"bold" ,marginBottom:"1rem"}}>Price : ${price}</span>   
                            <input type={'number'} className={styles.inputNumber} defaultValue={count} min={1} onChange={(e)=>setCount(e.currentTarget.value)} value={count}/>
                        </div>
                    </div>
                </div>
            </div>
                <div className={styles.order}>          
                      {user && <button className={styles.btn} onClick={addingToCartHandler}>Add To Cart</button>              }
                      {!user && <p style={{border:"1px solid black" , padding:".4rem" , borderRadius:"10px" , textAlign:"center", background:"red", color:"white"}}>Please register in our restaurant</p>}
                </div>
            </div>
        </>
    )
}
export default SingleProduct
export const getServerSideProps=async({params})=>{
    const response= await gettingSingleProduct(params.id)
    return{
        props:{
            pizz:response
        }
    }
}