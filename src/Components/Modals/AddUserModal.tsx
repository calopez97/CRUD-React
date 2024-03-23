import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useAppContext } from "../../Context/AppProvider"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);

interface addUserModalProps {
    onClose: Dispatch<SetStateAction<boolean>>,
}

const AddUserModal = ({ onClose }: addUserModalProps) => {

    const [mounted, setMounted] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() =>{
        setMounted(true);
    }, [])

    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
    })

    const { addUser, userAdded } = useAppContext()


    /**
      * La función `handleChange` en TypeScript React actualiza el estado con el nuevo valor basado en
      * el nombre del objetivo del evento.
      * @param {SetStateAction<{ nombre: cadena; apellido: cadena; correo electrónico: cadena; }> | cualquiera} e - El
      * Se espera que el parámetro `e` en la función `handleChange` sea un objeto `SetStateAction`
      * que contiene las propiedades `nombre`, `apellido` y `correo electrónico`, o puede ser de tipo `cualquiera`.
    */
    const handleChange = (e: SetStateAction<{ name: string; lastname: string; email: string; }> | any) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.ChangeEvent | any) => {
        e.preventDefault();

        try {
            const resp = await addUser(credentials)
            setError(resp.error)
            
        } catch (error) {
            console.error(`Error at handleSubmit ${error}`);
            setError(true)           
        }
    }


    /* Este bloque de código verifica si el indicador `userAdded` es verdadero y no hay errores (`!error`).
     Si se cumplen ambas condiciones, muestra un mensaje de éxito usando SweetAlert2 (`MySwal.fire`) para
     informar al usuario que el usuario se agregó correctamente. */
    if(userAdded && !error){
        return(
            <>
                {
                    
                    MySwal.fire({
                        icon:"success",
                        title: <p className="text-2xl">User was added succesfully</p>,
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
                        <h5 className="modal-title text-gray-900 text-xl uppercase font-bold">Add User</h5>
                        <button className="close font-bold text-gray-900 outline-none text-xl" onClick={() => onClose(false)}>
                            X
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="form flex flex-col text-gray-900" onSubmit={handleSubmit}>
                            <label
                                htmlFor="firstName"
                                className="label mt-2"
                            >Name</label>
                            <input type="text" className="p-2 border-gray-900 border-[1px]" name="firstName" id="firstName"
                                onChange={(e) => handleChange(e)}
                                placeholder="Write your name" />
                            <label
                                htmlFor="lastName"
                                className="label mt-2"
                            >LastName</label>
                            <input type="text"
                                onChange={(e) => handleChange(e)}
                                name="lastName"
                                className="p-2 border-gray-900 border-[1px]"
                                id="lastName" placeholder="Write your lastname" />
                            <label
                                htmlFor="email"
                                className="mt-2"
                            >Email</label>
                            <input type="email"
                                onChange={(e) => handleChange(e)}
                                className="p-2 border-gray-900 border-[1px]"
                                name="email" id="email" placeholder="Write your name" />

                            <button className="bg-green-500 text-white p-2 rounded-md"
                                // onClick={() =>(true)}
                                type="submit"
                            >
                                Add User
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

export default AddUserModal