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
    const { deleteUser, userWasDeleted, showUpdateModal, setShowUpdateModal, updateUser, getUserInfo} = useAppContext();

    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState([]);
    const { firstName, lastName, id, picture, title } = user


    const handleUpdateUser = async (id) => {
        const currentUser =  await getUserInfo(id)
        setCurrentUser(currentUser);
        // setCurrentUser(UserObj)
        setShowUpdateModal(true);
    }


    if(userWasDeleted){
        return(
            <>
                {
                    
                    MySwal.fire({
                        icon:"success",
                        title: <p className="text-2xl">User was deleted succesfully</p>,
                        confirmButtonColor:"#3085d6",
                        confirmButtonText:"OK",

                    }).then((result)=>{
                        if(result.isConfirmed){
                            window.location.href = "/"
                        }
                    })
                }
            </>
        )
    }

    return (
        <div
            className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark sm:w-[45%]  lg:w-1/3 text-gray-900">
            <a href="#!" className=""

            >
                <img
                    className="rounded-full my-4 h-auto w-1/2 mx-auto"
                    src={picture}
                    alt={firstName} />
            </a>
            <div className="p-6 text-surface dark:text-white">
                <span className="text-sm">{translateTitle[title]}</span>
                <h3 className="mb-2 text-xl font-medium leading-tight"> {firstName} {lastName}</h3>
                <p className="mb-4 text-base">
                </p>
                <div className="actions flex align-middle justify-between items-center gap-1">
                    <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        data-modal-target="modalId"
                        className="inline-block h-10 text-white rounded-2xl bg-purple-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        data-twe-ripple-init
                        data-twe-ripple-color="light">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="22"  height="22"  viewBox="0 0 22 22"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-list"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l11 0" /><path d="M9 12l11 0" /><path d="M9 18l11 0" /><path d="M5 6l0 .01" /><path d="M5 12l0 .01" /><path d="M5 18l0 .01" /></svg>
                    </button>
                    <button
                        type="button"
                        data-modal-target="modalId"
                        className="inline-block h-10 text-white rounded-2xl bg-green-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                        onClick={()=> handleUpdateUser(id)}
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="22"  height="22"  viewBox="0 0 22 22"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>

                    </button>
                    <button
                        type="button"
                        onClick={() => deleteUser(id)}
                        data-modal-target="modalId"
                        className="inline-block h-10 text-white rounded-2xl bg-red-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                    >

                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                    </button>
                </div>
            </div>
            {showModal && <UserModal
                onClose={setShowModal}
                userId={id}
            />}
            {
                showUpdateModal && 
                <UpdateUserModal
                    onClose={setShowUpdateModal}
                    currentUser={currentUser}
                />}
        </div>

    )
}

export default CardUser