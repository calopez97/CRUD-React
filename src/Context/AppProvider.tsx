//Componente encargado de usar useContext para manejar
//estados en la aplicación.
import axios from 'axios';
import {
    useContext,
    createContext,
    useState,
    useEffect,
} from 'react'
import { APP_ID, BASE_API_URL } from './credentials';



interface AuthProviderProps {
    children: React.ReactNode
}

//Inicializar 'Context' y declararle variables.
const AuthContext = createContext({
    users: [],
    loading:false,
    getUserInfo: (
        userId:string
    ) => {},
    deleteUser: (
        userId:string
    ) => {},
    addUser: (credentials: User.user | any)=>{}, 
    updateUser:(id:string, credentials: User.user | any)=>{},
    userAdded:false,
    userWasDeleted:false,
    showUpdateModal:false,
    setShowUpdateModal:(boolean) => {},
    userWasUpdated:false,
    setUserWasUpdated:  ( boolean ) => { }
})


export function AppProvider({ children }: AuthProviderProps) {

    const [users, setUsers] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ userAdded, setUserAdded ] = useState(false);
    const [userWasDeleted, setUserWasDeleted] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    
    const [userWasUpdated, setUserWasUpdated] = useState(false)
    
    useEffect(() => {
      
        const getUser = async () => {
      
            try {
                setLoading(true)
                const responseApi = await axios.get(`${BASE_API_URL}/user`, {
                    headers:{
                        "app-id":`${APP_ID}`
                    }
                })
                
                if(responseApi.status !== 200){
                    throw new Error("Something went wrong at getUser");
                }
            
                const data = responseApi.data;
                setUsers(data.data)
                setLoading(false);
                return data;    
            } catch (error) {
                setUsers([]);
                setLoading(true);
                console.error(`Error at getUsers ${error}`)
            }
            
        }
         

        getUser()

        
    
      return () => {
        
      }
    }, [])


    //Obtener Informacion de cada Usuario 
    const getUserInfo = async ( userId:string ) => {

        //Declaramos variables globales. Se crea URL de API encargada de hacer peticiones HTTP a Dummy.io
        const url = `${BASE_API_URL}/user/${userId}`
        
        //Petición para traer todos los usuarios
        try {
            const resp = await axios.get(url, {
                headers:{
                    "app-id":`${APP_ID}`
                }
            });
            
            if(resp.status !== 200){
                throw new Error("Error at response getUserInfo");
                
            }
            
            setLoading(false)
            return resp.data
    
        } catch (error) {
            console.error(`Error at getUserInfo ${error}`);
        
        }

    }
    
    //Eliminar usuario de lista de usuario
    const deleteUser = async (userId:string) =>{
        const url = `${BASE_API_URL}/user/${userId}`
        
        try {
            const resp = await axios.delete(url, {
                headers:{
                    "app-id":`${APP_ID}`
                }
            });
            
            if(resp.status !== 200){
                throw new Error("Error at response deleteUser");
            }

            setUserWasDeleted(true);
            
        } catch (error) {
            console.error(`Error at deleteUser ${error}`);
            setUserWasDeleted(false);
        
        }
    }


    //Agregar Usuario Nuevo;
    const addUser = async (credentials:any) =>{
        
        const url = `${BASE_API_URL}/user/create`
        
        
        try {
            const resp = await axios.post(url, credentials, {
                headers:{
                    "app-id":`${APP_ID}`
                },
            });            
            
            if(resp.status !== 200){
                throw new Error("Error at response addUser");
                
            }

            
            setUsers([resp.data , ...users ])
            setUserAdded(true);
            return { 
                error: false,
            }
            
        } catch (error) {
            setUserAdded(false);
            console.error(`Error at addUser ${error}`);
            return { 
                error: true,
            }
        }
    }


    //Actualizar usuario
    const updateUser = async (id:string, credentials:any) => {
        const url = `${BASE_API_URL}/user/${id}`
        
        try {
            const resp = await axios.put(url, credentials, {
                headers:{
                    "app-id":`${APP_ID}`
                },
            });            
            
            if(resp.status !== 200){
                throw new Error("Error at response addUser");
            }

            setUserWasUpdated(true)
            
        } catch (error) {
            setUserWasUpdated(false)
            console.error(`Error at addUser ${error}`);
        }
    }

    return(
        <AuthContext.Provider value={{ users, getUserInfo, 
                                        loading, deleteUser, 
                                        addUser, userAdded,
                                         userWasDeleted, showUpdateModal, 
                                         setShowUpdateModal, updateUser, userWasUpdated }}>
            {children}
        </AuthContext.Provider>
    ) 

}






export const useAppContext = () => useContext(AuthContext);