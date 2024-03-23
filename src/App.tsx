
import { useState } from 'react';
import './App.css'
import CardUser from './Components/Cards/CardUser'
import { useAppContext } from './Context/AppProvider'
import Layout from './Layout/Layout'
import ReactPaginate from 'react-paginate';

function App() {

  const { users, loading } = useAppContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(3);

  // ...


  const indexLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexLastUser);


  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };


  return (
    <>
      <Layout >
        <div className='container mx-auto'>
          <h1 className='w-full mx-auto text-center text-2xl font-bold my-5'>Usuarios:</h1>
          {
            !loading ?
              <>
                <div className='flex justify-center align-middle flex-wrap gap-7'>
                  {
                    currentUsers.length > 0 && currentUsers.map((user, id) => <CardUser key={id} user={user} />)

                  }
                </div>
                <ReactPaginate
                  className='paginate w-full mx-auto flex gap-3 text-center justify-center items-center my-4'
                  onPageChange={paginate}
                  pageCount={Math.ceil(users.length / usersPerPage)}
                  previousLabel={'Prev'}
                  nextLabel={'Next'}
                  containerClassName={'pagination'}
                  pageLinkClassName={'page-number'}
                  previousLinkClassName={'page-number'}
                  nextLinkClassName={'page-number'}
                  activeLinkClassName={'active'}
                />
              </>
              :
              <span>Loading...</span>
          }

        </div>
      </Layout>
    </>
  )
}

export default App
