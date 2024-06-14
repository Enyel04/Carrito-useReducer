import { useState, useEffect} from "react"


import type { CartItem } from "../types"

export const useCart=() => {
  
    const carritoInicial=() :CartItem[] => {
        const localStorageCart=localStorage.getItem("cart")
        return localStorageCart? JSON.parse(localStorageCart): []
      }
     
      const [cart]= useState(carritoInicial)
    
   
    
      useEffect(() => {
          localStorage.setItem("cart",JSON.stringify(cart)) //para guardar elementos en el localStorage
      },[cart])
      
    
   
    

      
    
   
   

    

    return{
    
       cart
    }
}

