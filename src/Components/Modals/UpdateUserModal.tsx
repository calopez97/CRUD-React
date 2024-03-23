import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useAppContext } from "../../Context/AppProvider"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);

interface UpdateUserModalProps {
    onClose: Dispatch<SetStateAction<boolean>>,
    currentUser:any,
}

const UpdateUserModal = ({ onClose, currentUser }: UpdateUserModalProps) => {

    
    
    const [mounted, setMounted] = useState(false)
    const [error, setError] = useState(false)


    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: currentUser?.email,
    })

    const {  userWasUpdated, updateUser } = useAppContext()


    useEffect(() =>{
        setMounted(true);
    }, [])

    /**
     * La función handleChange actualiza el estado de las credenciales según el nombre y el valor del objetivo.
     * de un evento.
     * @param {SetStateAction<{ nombre: cadena; apellido: cadena; correo electrónico: cadena; }> | cualquiera} e - La `e`
     * Se espera que el parámetro en la función `handleChange` sea del tipo `SetStateAction<{ nombre:
     * cadena; apellido: cadena; correo electrónico: cadena; }> | cualquiera`. Esto significa que `e` puede ser un objeto
     * de tipo `{ nombre: cadena; apellido: cadena;
    */
    const handleChange = (e: SetStateAction<{ name: string; lastname: string; email: string; }> | any) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        })
    }


    /**
      * La función `handleUpdatedSubmit` es una función asincrónica que actualiza la información de un usuario y
      * maneja cualquier error que ocurra durante el proceso.
      * @param {React.ChangeEvent | any} e - El parámetro `e` en la función `handleUpdatedSubmit` es de
      * escriba `React.ChangeEvent` o `cualquiera`. Normalmente es un objeto de evento que se pasa a la función,
      * como un evento de envío de formulario. Luego, la función evita el comportamiento predeterminado del evento usando
      * `e.preventDefault()`
    */

    const handleUpdatedSubmit = async (e: React.ChangeEvent | any) => {
        e.preventDefault();

        try {
            const resp = await updateUser(currentUser.id , credentials)
            setError(false)
            console.log(resp);
            
        } catch (error) {
            console.error(`Error at handleUpdatedSubmit ${error}`);
            setError(true)           
        }
    }

    
    /* Este bloque de código verifica si el indicador `userWasUpdated` es verdadero y no hay errores
     (`!error`). Si se cumplen ambas condiciones, muestra un mensaje de éxito usando SweetAlert2
     (`MySwal.fire`) para informar al usuario que el usuario se actualizó correctamente. */
    if(userWasUpdated  && !error){
        return(
            <>
                {
                    
                    MySwal.fire({
                        icon:"success",
                        title: <p className="text-2xl">User was updated succesfully</p>,
                        confirmButtonColor:"#3085d6",
                        confirmButtonText:"OK",

                    }).then((result)=>{
                        if(result.isConfirmed){
                            onClose(false);
                            window.location.href = '/'
                        }
                    })
                }
            </>
        )
    }

    return (

        !error ? 
        <div className="modal show fade block bg-[#000000ba]" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header justify-between">
                        <h5 className="modal-title text-gray-900 text-xl uppercase font-bold">Update User</h5>
                        <button className="close font-bold text-gray-900 outline-none text-xl" onClick={() => onClose(false)}>
                            X
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="form flex flex-col text-gray-900" onSubmit={handleUpdatedSubmit}>
                            <label
                                htmlFor="firstName"
                                className="label mt-2"
                            >Name</label>
                            <input type="text" className="p-2 border-gray-900 border-[1px]" name="firstName" id="firstName"
                                onChange={(e) => handleChange(e)}
                                placeholder={currentUser?.firstName} />
                            <label
                                htmlFor="lastName"
                                className="label mt-2"
                            >LastName</label>
                            <input type="text"
                                onChange={(e) => handleChange(e)}
                                name="lastName"
                                
                                className="p-2 border-gray-900 border-[1px]"
                                id="lastName" placeholder={currentUser?.lastName} />
                            <label
                                htmlFor="email"
                                className="mt-2"
                            >Email</label>
                            <input type="email"
                                onChange={(e) => handleChange(e)}
                                value={currentUser?.email}
                                className="p-2 border-gray-900 border-[1px] pointer-events-none"
                                name="email" id="email" placeholder={currentUser?.email} 
                                disabled
                            />
    
                            <button className="bg-emerald-500 text-white p-2 rounded-md"
                                // onClick={() =>(true)}
                                type="submit"
                            >
                                Update Info
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div> 
        :
        <p>Loading...</p>
    )
}

export default UpdateUserModal