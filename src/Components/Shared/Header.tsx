import { useState } from "react"
import AddUserModal from "../Modals/AddUserModal"

const Header = () => {
    const [showAddUserModal, setShowAddUserModal] = useState(false)

    return (
        <>
            <header className="bg-white py-2 sticky z-10 top-0 shadow-md text-gray-900 w-full">
                <nav className="container">
                    <ul className="flex justify-between align-middle items-center">
                        <li className="font-bold text-sm">
                            CRUD REACT - TS - VITE - TailwindCSS
                        </li>
                        <li>
                            <button className="bg-green-500 text-white p-2 rounded-md"
                                onClick={()=> setShowAddUserModal(true)}
                            >
                                Add User
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
            {
                showAddUserModal && <AddUserModal
                onClose={setShowAddUserModal}
            />}
        </>

        
    )
}

export default Header