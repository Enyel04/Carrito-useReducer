import { useState, useEffect} from "react"


import type { Guitarra,CartItem } from "../types"

export const useCart=() => {
  
    const carritoInicial=() :CartItem[] => {
        const localStorageCart=localStorage.getItem("cart")
        return localStorageCart? JSON.parse(localStorageCart): []
      }
     
      const [cart,setCart]= useState(carritoInicial)
    
      const MAX_ITEMS=5 //maximo de elementos en el carrito
      const MIN_ITEMS=1 //minimo de elementos en el carrito
    
      useEffect(() => {
          localStorage.setItem("cart",JSON.stringify(cart)) //para guardar elementos en el localStorage
      },[cart])
      
    
   
    
    function removeFromCart(id : Guitarra["id"]) {
    
      setCart((prevCart) =>prevCart.filter (guitarra=>guitarra.id !==id)) //Agregando setcart para eliminar carrito de compra, pasa id de guitarra para proceder a eliminarlo
    }
    
    function incrementarCantidad(id : Guitarra["id"]) {
    
        const updateCart=cart.map(item=>{
          if (item.id===id && item.cantidad < MAX_ITEMS) {
            return {
              ...item,
              cantidad:item.cantidad+1
            }
          }
          return item
        })
        setCart(updateCart)
    
    }
    function descrementarCantidad(id: Guitarra["id"]) {
      const updateCart=cart.map(item=>{
        if (item.id===id && item.cantidad > MIN_ITEMS) {
          return {
            ...item,
            cantidad:item.cantidad-1
          }
        }
        return item
      })
      setCart(updateCart)
     
    }
    
    function clearCart() {
      setCart([])
    }

    

    return{
    
       cart,
       removeFromCart,
       incrementarCantidad,
       descrementarCantidad,
       clearCart
    }
}

