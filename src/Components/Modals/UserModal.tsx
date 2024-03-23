import { useState, useEffect, Dispatch, SetStateAction } from "react";

import { useAppContext } from "../../Context/AppProvider";
import { translateTitle } from "../utils/translateTitle";

interface userModalProps {
    onClose: Dispatch<SetStateAction<boolean>>,
    userId: string
}

const UserModal = ({ onClose, userId }: userModalProps) => {

    const [user, setUser] = useState([]);
    const [errors, setErrors] = useState(true);

    const { getUserInfo, deleteUser, setShowUpdateModal } = useAppContext()

    useEffect(() => {
        handleUserInfo(userId)

    }, [userId])


    /**
     * La función `handleUserInfo` obtiene de forma asincrónica información del usuario por ID de usuario y actualiza el
     * estado con los datos recuperados o establece un indicador de error si hay un error.
     * @param {string} userId: el parámetro `userId` es una cadena que representa el identificador único de
     * un usuario. Se utiliza para recuperar la información del usuario de la base de datos o de cualquier otra fuente de datos.
    */
    const handleUserInfo = async (userId: string) => {
        try {
            const info = await getUserInfo(userId);

            setUser(info);
            setErrors(false);
        } catch (error) {
            console.error(`Error in getUser: ${error}`);
            setErrors(true)
        }
    }

    /**
      * La función `handleDeleteUser` cierra un modal y elimina un usuario según la ID proporcionada.
      * @param {string} id: el parámetro `id` en la función `handleDeleteUser` es una cadena que
      * representa el identificador único del usuario que desea eliminar.
    */
    const handleDeleteUser = (id: string) => {
        onClose(!close)
        deleteUser(id)
    }


    /**
      * La función `handleShowUpdateModal` establece el estado `showUpdateModal` en verdadero y llama al
      * Función `onClose` con falso como argumento.
    */
    const handleShowUpdateModal = () => {
        setShowUpdateModal(true);
        onClose(false)
    }

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    };


    const getDate = new Date(user.publishDate);
    const creationDate = getDate.toLocaleDateString("en-US", options);

    const birthDay = new Date(user.dateOfBirth);
    const birthDate = birthDay.toLocaleDateString("en-US", options);

    const { location } = user;




    return (
        <>
            {
                !errors ? (
                    <div className="modal show fade block bg-[#000000c2]" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header justify-between">
                                    <h5 className="modal-title text-xl uppercase font-bold">Perfil</h5>

                                    <button className="close font-bold text-xl" onClick={() => onClose(false)}>
                                        X
                                    </button>
                                </div>

                                <div className="modal-body text-center">
                                    {/* <small className="block">Your id: {user.id}</small> */}
                                    <div className="image-modal-profile ">
                                        <img alt={user.title} className="mx-auto rounded-full" title={user.title} src={user.picture} />
                                    </div>
                                    <div className="modal-profile">
                                        <small className="prefix">{translateTitle[user.title]}</small>
                                        <h3 className="first-name text-xl font-bold">{user.firstName}</h3>
                                        <p className="last-name">{user.lastName}</p>
                                    </div>
                                </div>
                                <div className="modal-footer gap-5 flex-wrap">
                                    <ul className="info-list md:w-[40%] font-bold flex flex-col justify-center align-middle">
                                        <li className="field t w-full mb-2">Género
                                            <p className="data font-light">{user.gender}</p>
                                        </li>
                                        <li className="field w-full mb-2">Fecha de nacimiento
                                            <p className="data font-light">{birthDate}</p>
                                        </li>
                                        <li className="field w-full mb-2">Día de registro
                                            <p className="data font-light">{creationDate}</p>
                                        </li>
                                        <li className="field w-full mb-2">Email
                                            <p className="data font-light">{user.email}</p>
                                        </li>
                                        <li className="field w-full mb-2">Télefono
                                            <p className="data font-light">{user.phone}</p>
                                        </li>
                                    </ul>
                                    <ul className="info-list  md:w-[40%] justify-center font-bold align-middle ">
                                        <li className="field mb-2">Estado
                                            <p className="data font-light">{location.state}</p>
                                        </li>
                                        <li className="field mb-2">Calle
                                            <p className="data font-light">{location.street}</p>
                                        </li>
                                        <li className="field mb-2">País
                                            <p className="data font-light">{location.country}</p>
                                        </li>
                                        <li className="field mb-2">Ciudad
                                            <p className="data font-light">{location.city}</p>
                                        </li>
                                        <li className="field mb-2">Zona horaria
                                            <p className="data font-light">{location.timezone}</p>
                                        </li>
                                    </ul>
                                    <div className="actions w-full">
                                        <button type="button"
                                            className="btn btn-primary bg-blue-500 text-white w-full block"
                                            onClick={()=> handleShowUpdateModal()}
                                        >Edit User</button>
                                        <button
                                            type="button"
                                            className="btn btn-danger bg-red-500 text-white mt-2 w-full block"
                                            data-bs-dismiss="modal"
                                            onClick={() => handleDeleteUser(userId)}
                                        >Delete User</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    null
                )
            }

            
        </>


    )
}

export default UserModal