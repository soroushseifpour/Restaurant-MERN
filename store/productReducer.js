import { createSlice } from "@reduxjs/toolkit";
const PIZZA = [
  {
    id: 1,
    name: 'american',
    description: 'The best pizza ever',
    price: [
      9, 10, 12
    ],
    ingredients: [
      'mushrooms', 'cheese', 'meat', 'vegtables'
    ],
    extraOptiopn: {
      'double-cheese': 2,
      'garlic-sauce': 3,
    }
  },
  {
    id: 2,
    name: 'persian',
    description: 'The best pizza ever',
    price: [
      9, 10, 12
    ],
    ingredients: [
      'mushrooms', 'cheese', 'meat', 'vegtables'
    ]
    ,
    extraOptiopn: {
      'double-cheese': 2,
      'garlic-sauce': 3,
    }
  },
  {
    id: 3,
    name: 'italian',
    description: 'The best pizza ever',
    price: [
      9, 10, 12
    ],
    ingredients: [
      'mushrooms', 'cheese', 'meat', 'vegtables'
    ],
    extraOptiopn: {
      'double-cheese': 2,
      'garlic-sauce': 3,
    }
  },
  {
    id: 4,
    name: 'lebeness',
    description: 'The best pizza ever',
    price: [
      9, 10, 12
    ],
    ingredients: [
      'mushrooms', 'cheese', 'meat', 'vegtables'
    ],
    extraOptiopn: {
      'double-cheese': 2,
      'garlic-sauce': 3,
    }
  },
  {
    id: 5,
    name: 'chicken',
    description: 'The best pizza ever',
    price: [
      9, 10, 12
    ],
    ingredients: [
      'mushrooms', 'cheese', 'meat', 'vegtables'
    ],
    extraOptiopn: {
      'double-cheese': 2,
      'garlic-sauce': 3,
    }
  },
  {
    id: 6,
    name: 'mexican',
    description: 'The best pizza ever',
    price: [
      11, 12, 14
    ],
    ingredients: [
      'mushrooms', 'cheese', 'checken', 'vegtables', 'paper'
    ],
    extraOptiopn: {
      'double-cheese': 2,
      'garlic-sauce': 3,
    }
  },
  {
    id: 7,
    name: 'mushroom',
    description: 'The best pizza ever',
    price: [
      5, 7, 8
    ],
    ingredients: [
      'mushrooms', 'cheese'
    ],
    extraOptiopn: {
      'double-cheese': 2,
      'garlic-sauce': 3,
    }
  },
  {
    id: 8,
    name: 'meat',
    description: 'The best pizza ever',
    price: [
      14, 15, 16
    ],
    ingredients: [
      'cheese', 'meat', 'vegtables'
    ],
    extraOptiopn: {
      'double-cheese': 2,
      'garlic-sauce': 3,
    }
  },
]
const initialState = {
  products: [],
  product: {},
  cart: []
}
const prodcutReducer = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setProducts(state, action) {
      state.products.push(...action.payload)
    },
    setSingelProduct(state, action) {
      state.product = { ...action.payload }
    },
    addToCart(state, action) {
      const cart = state.cart
      const newProduct = action.payload;
      const isExist = cart.find(p => p.id === newProduct.id && p.price == newProduct.price)
      if (isExist) {
        let count = newProduct.count;
        const selectedProductIndex = state.cart.findIndex(p => p.id === newProduct.id && p.price == newProduct.price)
        const selectedProduct = state.cart[selectedProductIndex];
        selectedProduct.count = parseInt(selectedProduct.count) + parseInt(count);
        state.cart.splice(selectedProductIndex, 1, selectedProduct)
      }
      else
        state.cart.push(action.payload)
    },
    deleteFromCart(state, action) {
      const cart = state.cart
      const newProduct = action.payload;
      const selectedProductIndex = state.cart.findIndex(p => p.id === newProduct.id && p.price == newProduct.price)
      const selectedProduct = state.cart[selectedProductIndex];
      selectedProduct.count = parseInt(selectedProduct.count) - 1;
      if (selectedProduct.count == 0) {
        const newProducts = state.cart.filter(item => item.id !== newProduct.id)
        state.cart = newProducts
      }
    }
  }
})
export const gettingData = () => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(PIZZA)
    }, 300);
  })
  return promise;
}
export const gettingProducts = (pro) => {
  return async dispatch => {
    try {
      // const response=await gettingData();
      // console.log(response)
      dispatch(productActions.setProducts(pro))
    } catch (err) {

    }
  }
}
export const gettingSingleProduct = (id) => {
  const promise = new Promise((resolve) => {
    let pizza = {};
    const index = PIZZA.findIndex(p => p.id === parseInt(id))
    pizza = PIZZA[index];
    setTimeout(() => {
      resolve(pizza);
    }, 300);
  })
  return promise
}
export const productActions = prodcutReducer.actions;
export default prodcutReducer.reducer;