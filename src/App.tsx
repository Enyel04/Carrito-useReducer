
//Realizando llamado de header

import { useReducer,useEffect } from 'react'
import Header from './components/header'
import Guitarra from './components/guitarra'



import { InitialState, cartReducer } from './reducers/cart-reducer'


  //State, los Hooks tienen que estar en la parte superior y no se puede cambiar su valor
  //Effect si deja de hacer esto


function App() {



  const [state,dispatch]= useReducer(cartReducer,InitialState)

  useEffect(() => {
      localStorage.setItem("cart",JSON.stringify(state.cart)) //para guardar elementos en el localStorage
  },[state.cart])


  

 //En typeScript hay que ser especifico con los datos
  

  return (
    <>
  
      <Header
        cart={state.cart}
        dispatch={dispatch}
     
   
       
   
      />
    
      {/* Recuerda que para llamar a un componente tiene que ser en mayuscula*/}
   

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {state.data.map((guitarra) => {

            return(<Guitarra
                key={guitarra.id}
                guitarra={guitarra}

                dispatch={dispatch}
            />)
          })}
   
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    {/*   Aqui termina el html, y este comentario es jsx */}
    </>

  )

}

export default App
