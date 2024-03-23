import { useState } from "react";
import ReactPaginate from "react-paginate";
import CardUser from "./Cards/CardUser";

const Dashboard = ({ users }: any) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(4);

    // ...


    const indexLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexLastUser);


    const paginate = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-700  lg:max-w-[980px] lg:mx-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 bg-gray-700  dark:text-gray-400">
                    <thead className="text-xs text-gray-50 uppercase  bg-slate-700  dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Foto Perfil
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Primer Nombre
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Apellido
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Título
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Opciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentUsers.length > 0 && currentUsers.map((user, id) => <CardUser key={id} user={user} />)

                        }
                    </tbody>
                </table>

            </div>
            <ReactPaginate
                className='paginate w-full mx-auto flex gap-3 text-center justify-center items-center my-4'
                onPageChange={paginate}
                pageCount={Math.ceil(users.length / usersPerPage)}
                previousLabel={'Anterior'}
                nextLabel={'Siguiente'}
                containerClassName={'pagination'}
                pageLinkClassName={'page-number'}
                previousLinkClassName={'page-number'}
                nextLinkClassName={'page-number'}
                activeLinkClassName={'active'}
            />

        </>
    )
}

export default Dashboard