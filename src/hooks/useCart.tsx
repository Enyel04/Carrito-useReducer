import { useState, useEffect, useMemo } from "react"


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
        //State derivado
    const isEmpty= useMemo(() => cart.length===0, [cart] ) //Lee si hay elementos en el carrito, de base sera 0
    const cartTotal=useMemo(() => cart.reduce((total,item)=> total +(item.cantidad*item.price),0),[cart]) //Calculara la cantidad de guitarras (items) en el carrito y los multiplicara por el precio, luego se suma el total
    

    return{
    
       cart,
   
       removeFromCart,
       incrementarCantidad,
       descrementarCantidad,
       clearCart,
       isEmpty,
       cartTotal
    }
}

