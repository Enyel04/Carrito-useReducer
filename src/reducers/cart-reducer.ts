import { db } from "../data/db";

import { CartItem, Guitarra } from "../types";

export type CartAction=
    { type: 'add-to-cart',payload:{item:Guitarra}}|
    {type: 'remove-from-cart',payload:{item:Guitarra['id']}} |
    {type: 'descrementar-cantidad',payload:{item:Guitarra['id']}} |
    {type: 'incrementar-cantidad',payload:{item:Guitarra['id']}} |
    {type: 'clear-cart'} 


    export type CartState={

        data :Guitarra[]
        cart:CartItem[]
    }

    const carritoInicial=() :CartItem[] => {
        const localStorageCart=localStorage.getItem("cart")
        return localStorageCart? JSON.parse(localStorageCart): []
      }

    export const InitialState : CartState={

        data: db,
        cart:carritoInicial()
    }

    const MAX_ITEMS=5 //maximo de elementos en el carrito
    const MIN_ITEMS=1 //minimo de elementos en el carrito
    export const cartReducer = (
        state: CartState =InitialState,
        action:CartAction
    ) => {
        
        if (action.type==="add-to-cart") {

 
          
            const itemExists= state.cart.find((guitarra) => guitarra.id===action.payload.item.id)
            let updateCart: CartItem[]=[]
    
            if (itemExists) { //Existe en el carrito
          
              updateCart = [...state.cart.map(item=>{
                if (item.id===action.payload.item.id) {
                    if (item.cantidad < MAX_ITEMS) {
                        return {...item, cantidad: item.cantidad+1}
                    }else{
                        return item
                    }
                }  
                else{
                    return item
                }
             
              }
            
            )]
          
        
              
            } else{
                const newItem: CartItem= {...action.payload.item,cantidad:1}
                 //procede a crear una copia exacta para irlos agregando y empezara con 1
                updateCart=[...state.cart,newItem]
              }
        
            return {
                ...state,cart:updateCart
            }
        }
        if (action.type==="remove-from-cart") {


           
        const cart=state.cart.filter(item=> item.id!==action.payload.item)
            
            return {
                ...state,
                cart
            }
        }

        if (action.type==="incrementar-cantidad") {


            const cart=state.cart.map(item=>{
                if (item.id===action.payload.item && item.cantidad < MAX_ITEMS) {
                  return {
                    ...item,
                    cantidad:item.cantidad+1
                  }
                }
                return item
              })
   
          
            return {
                ...state,
                cart
            }
        }
        if (action.type=== "descrementar-cantidad") {

            const cart=state.cart.map(item=>{
                if (item.id===action.payload.item && item.cantidad > MIN_ITEMS) {
                  return {
                    ...item,
                    cantidad:item.cantidad-1
                  }
                }
                return item
              })
             
            return {
                ...state,
                cart
            }
        }
        if (action.type=== "clear-cart") {

            const cart=state.cart=[]
            
            return {
                ...state,
                cart
            }
        }
        return state

    }