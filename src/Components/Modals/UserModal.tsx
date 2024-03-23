import { useState, useEffect, Dispatch, SetStateAction } from "react";

import { useAppContext } from "../../Context/AppProvider";
import { translateTitle } from "../utils/translateTitle";
import UpdateUserModal from "./UpdateUserModal";

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

    const handleDeleteUser = (id: string) => {
        onClose(!close)
        deleteUser(id)
    }


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
                    <div className="modal show fade block bg-[#000000ba]" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header justify-between">
                                    <h5 className="modal-title text-xl uppercase font-bold">Information </h5>

                                    <button className="close font-bold text-xl" onClick={() => onClose(false)}>
                                        X
                                    </button>
                                </div>

                                <div className="modal-body">
                                    {/* <small className="block">Your id: {user.id}</small> */}
                                    <div className="image-modal-profile">
                                        <img alt={user.title} title={user.title} src={user.picture} />
                                    </div>
                                    <div className="modal-profile">
                                        <small className="prefix">{translateTitle[user.title]}</small>
                                        <h3 className="first-name">{user.firstName}</h3>
                                        <p className="last-name">{user.lastName}</p>
                                    </div>
                                </div>
                                <div className="modal-footer gap-5 flex-wrap">
                                    <ul className="info-list md:w-[40%] font-bold flex flex-col justify-center align-middle">
                                        <li className="field t w-full">Gender
                                            <p className="data font-light">{user.gender}</p>
                                        </li>
                                        <li className="field w-full">Date of Birth
                                            <p className="data font-light">{birthDate}</p>
                                        </li>
                                        <li className="field w-full">Register Date
                                            <p className="data font-light">{creationDate}</p>
                                        </li>
                                        <li className="field w-full">Email
                                            <p className="data font-light">{user.email}</p>
                                        </li>
                                        <li className="field w-full">Phone
                                            <p className="data font-light">{user.phone}</p>
                                        </li>
                                    </ul>
                                    <ul className="info-list  md:w-[40%] justify-center font-bold align-middle ">
                                        <li className="field">State
                                            <p className="data font-light">{location.state}</p>
                                        </li>
                                        <li className="field">Street
                                            <p className="data font-light">{location.street}</p>
                                        </li>
                                        <li className="field">Country
                                            <p className="data font-light">{location.country}</p>
                                        </li>
                                        <li className="field">City
                                            <p className="data font-light">{location.city}</p>
                                        </li>
                                        <li className="field">Timezone
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