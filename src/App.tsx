
import './App.css'
import { useAppContext } from './Context/AppProvider'
import Layout from './Layout/Layout'
import Dashboard from './Components/Dashboard';

function App() {

  const { users, loading } = useAppContext();

  


  return (
    <>
      <Layout >
        <div className='container mx-auto'>
          <h1 className='w-full mx-auto text-center text-2xl font-bold my-5'>Usuarios:</h1>
          {
            !loading ?
              <>
                <Dashboard users={users} />
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
