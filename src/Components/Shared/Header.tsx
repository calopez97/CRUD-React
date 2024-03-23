import { useState } from "react"
import AddUserModal from "../Modals/AddUserModal"

const Header = () => {
    const [showAddUserModal, setShowAddUserModal] = useState(false)

    return (
        <>
            <header className="bg-gray-700 py-2 sticky z-10 top-0 shadow-md text-gray-900 w-full">
                <nav className="container lg:max-w-[980px]">
                    <ul className="flex justify-between align-middle items-center">
                        <li className="font-bold text-sm">
                            <span className="text-orange-500">C</span><span className="text-blue-500">R</span><span className="text-green-500">U</span><span className="text-red-500">D</span>
                        </li>
                        <li>
                            <button className="bg-green-500 text-white p-2 rounded-md text-[0px] md:text-base"
                                onClick={()=> setShowAddUserModal(true)}
                            >
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor" 
                                 strokeWidth="2"  strokeLinecap="round"  
                                 strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-clipboard-plus inline-flex mr-1"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M10 14h4" /><path d="M12 12v4" /></svg>
                                Agregar Usuario
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