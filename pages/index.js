import Navbar from "../components/shared/Navbar/Navbar";
import Slider from "../components/Slider/Slider";
import styles from '../styles/Home.module.css'
// import img from '../public/assets/images/pizza.png'
import Image from "next/image";
import Pagination from "../components/shared/Pagination/Pagination";
import { useEffect, useState } from "react";
import { paginator } from "../components/Utility/Paginate";
import productReducer, { gettingData, gettingProducts } from "../store/productReducer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
let START=true;
const PIZZA=[
  {
    name:'american',
    description:'The best pizza ever',
    price:[
      9,10,12
    ],
    ingredients:[
      'mushrooms','cheese','meat','vegtables'
    ]
  },
  {
    name:'persian',
    description:'The best pizza ever',
    price:[
      9,10,12
    ],
    ingredients:[
      'mushrooms','cheese','meat','vegtables'
    ]
  },
  {
    name:'italian',
    description:'The best pizza ever',
    price:[
      9,10,12
    ],
    ingredients:[
      'mushrooms','cheese','meat','vegtables'
    ]
  },
  {
    name:'lebeness',
    description:'The best pizza ever',
    price:[
      9,10,12
    ],
    ingredients:[
      'mushrooms','cheese','meat','vegtables'
    ]
  },
  {
    name:'chicken',
    description:'The best pizza ever',
    price:[
      9,10,12
    ],
    ingredients:[
      'mushrooms','cheese','meat','vegtables'
    ]
  },
  {
    name:'mexican',
    description:'The best pizza ever',
    price:[
      11,12,14
    ],
    ingredients:[
      'mushrooms','cheese','checken','vegtables','paper'
    ]
  },
  {
    name:'mushroom',
    description:'The best pizza ever',
    price:[
      5,7,8
    ],
    ingredients:[
      'mushrooms','cheese'
    ]
  },
  {
    name:'meat',
    description:'The best pizza ever',
    price:[
      14,15,16
    ],
    ingredients:[
      'cheese','meat','vegtables'
    ]
  },
]
export default function Home({pizzas}) {
  const [currentPage, setCurrentPage] = useState(1)
  // const p=useSelector(state=>state.product).products
  const dispatch=useDispatch()
  const router=useRouter()
  useEffect(()=>{
  //   gettingData().then(res=>{
  //     dispatch(gettingProducts(res))
  //   })
    dispatch(gettingProducts(pizzas))
  },[])
  const pageCount=3;
  const pagenumbers= parseInt((PIZZA.length/pageCount)) +1;
  const [pizza, setPizza] = useState([...paginator(1,pagenumbers,[...pizzas])])
  const pagination=(index)=>{
      const pizzaFlitered=paginator(index,pageCount,[...pizzas])
      setPizza(pizzaFlitered);
      setCurrentPage(index)
  }

  return (
   <>
   <div className={styles.container}>
      <Slider/>
      <h1 style={{color:"darkred", fontWeight:"bold", textAlign:"center"}}>Pizza Items</h1>
      <div className={styles.itemList}>
          {pizza.length > 0 ? pizza.map((pizza,i)=>{
            return(
              <>
                <div className={styles.card} key={i} onClick={()=>router.push(`/products/${pizza.id}`)}>
                    <div className={styles.cardImage}>
                      <Image src="/pizza.png" layout="responsive" width={500} height={500}/>
                    </div>
                    <div className={styles.cardheader}>
                      <h3>{pizza.name}</h3>
                    </div>
                    <h2>Ingredients</h2>
                    <ul className={styles.ingredients}>
                        {pizza.ingredients.map((ing,i)=>{
                          return(
                            <>
                              <li className={styles.ingredient} key={i}>{ing}</li>
                            </>
                          )
                        })}
                    </ul>
                    <button className={styles.btn}>Customize</button>
                </div>
              </>
            )
          }) : <>loading</>}
      <Pagination pagination={pagination} currentPage={currentPage} pagenumbers={pagenumbers}/>
      </div>
   </div>
   </>
  )
}
export async function getStaticProps(){
      const response= await gettingData()
      return {
        props:{
            pizzas:response    
        }
      }
}
