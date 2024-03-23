import { useState } from "react";
import { User } from "../../types/types";
import UserModal from "../Modals/UserModal";
import { useAppContext } from "../../Context/AppProvider";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { translateTitle } from "../utils/translateTitle";
import UpdateUserModal from "../Modals/UpdateUserModal";


const MySwal = withReactContent(Swal);


const CardUser = ({ user }: User) => {
    const { deleteUser, userWasDeleted, showUpdateModal, setShowUpdateModal, updateUser, getUserInfo, currentUser } = useAppContext();

    const [showModal, setShowModal] = useState(false);
    const { firstName, lastName, id, picture, title } = user


    /**
      * La función `handleUpdateUser` obtiene de forma asincrónica información del usuario por ID y luego establece un
      * estado para mostrar un modal de actualización.
      * @param {string} id: el parámetro `id` en la función `handleUpdateUser` es una cadena que
      * representa el identificador único de un usuario.
    */
    const handleUpdateUser = async (id: string) => {
        await getUserInfo(id);

        setShowUpdateModal(true);
    }


    /**
      * La función handleDeleteUser muestra un cuadro de diálogo de confirmación usando SweetAlert y elimina un usuario
      * si el usuario confirma la acción.
      * @param {string} id: el parámetro `id` en la función `handleDeleteUser` es una cadena que
      * representa el identificador único del usuario que se está eliminando. Este identificador se utiliza para
      * localizar y eliminar del sistema al usuario correspondiente.
     */
    const handleDeleteUser = (id: string) => {
        MySwal.fire({
            icon: "warning",
            title: <p className="text-2xl">¿Estás seguro de eliminar éste usuario?</p>,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "BORRAR",
            cancelButtonColor: "#d33",
            cancelButtonText: "CANCELAR",
            showCancelButton: true,
        }).then((result) => {
            if (result.isDenied) {
                setShowModal(false)
            }
            if (result.isConfirmed) {
                deleteUser(id)
            }
        })

    }

    /* Este bloque de código verifica si el indicador `userWasDeleted` es verdadero. Si es cierto, mostrará un
     mensaje de éxito usando SweetAlert con un ícono, título y un botón de confirmación. Una vez que el usuario
     hace clic en el botón de confirmación, redirigirá al usuario a la página de inicio configurando
     `ventana.ubicación.href = "/"`. Esta es una forma de proporcionar comentarios al usuario sobre la eliminación.
     exitosamente y luego redirigirlos automáticamente a otra página. */
    if (userWasDeleted) {
        return (
            <>
                {

                    MySwal.fire({
                        icon: "success",
                        title: <p classNameName="text-2xl">¡Usuario eliminado satisfactoriamente!</p>,
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK",

                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/"
                        }
                    })
                }
            </>
        )
    }

    return (
        <>

            <tr className="odd:bg-slate-300 odd:dark:bg-gray-900 even:bg-gray-200 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-1 py-1 md:px-6 md:py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <img src={picture} alt={firstName} className="rounded-full" />
                </th>
                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {id?.slice(id.length - 5,id.length)}
                </th>
                <td className="px-6 py-2">
                    {firstName}
                </td>
                <td className="px-6 py-2">
                    {lastName}
                </td>
                <td className="px-6 py-2">
                    {translateTitle[title]}
                </td>
                <td className="px-6 py-2">
                    <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        data-modal-target="modalId"
                        className="mb-2 md:mr-2 md:mb-0 inline-block h-10 text-white rounded-lg bg-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        data-twe-ripple-init
                        data-twe-ripple-color="light">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h1.5" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M20.2 20.2l1.8 1.8" /></svg>
                    </button>
                    <button

                        type="button"
                        data-modal-target="modalId"
                        className="mb-2 md:mr-2 md:mb-0 inline-block h-10 text-white rounded-lg bg-blue-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                        onClick={() => handleUpdateUser(id)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>

                    </button>
                    <button
                        type="button"
                        onClick={() => handleDeleteUser(id)}
                        data-modal-target="modalId"
                        className="inline-block h-10 text-white rounded-lg bg-red-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                    >

                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                    </button>
                </td>
            </tr>

            {
                showModal && 
                <UserModal
                    onClose={setShowModal}
                    userId={id}
                />
            }
            {
                showUpdateModal &&
                <UpdateUserModal
                    onClose={setShowUpdateModal}
                    currentUser={currentUser}
                />
            }
        </>
    )
}

export default CardUser