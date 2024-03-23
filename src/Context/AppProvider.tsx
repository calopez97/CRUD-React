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
    setUserWasUpdated:  ( boolean ) => { },
    currentUser:[],
})


export function AppProvider({ children }: AuthProviderProps) {

    const [users, setUsers] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ userAdded, setUserAdded ] = useState(false);
    const [userWasDeleted, setUserWasDeleted] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [userWasUpdated, setUserWasUpdated] = useState(false)
    const [currentUser, setCurrentUser] = useState([])
    
    
    useEffect(() => {
      
        /**
          * La función `getUser` realiza una llamada API asincrónica para recuperar datos y identificadores del usuario.
          * Estados de carga y errores correspondientes.
          * @returns La función `getUser` devuelve el objeto de datos recibido de la llamada API.
        */
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
    /**
      * La función `getUserInfo` es una función asincrónica que realiza una solicitud GET a un determinado
      * Punto final API para recuperar información del usuario según el "userId" proporcionado.
      * @param {string} userId - El parámetro `userId` en la función `getUserInfo` es una cadena que
      * representa el identificador único del usuario del que desea recuperar información. Este
      * La función realiza una solicitud asincrónica a un punto final API para obtener información del usuario según el
      * proporcionó `Id. de usuario`.
      * @returns La función `getUserInfo` devuelve los datos recibidos de la respuesta API si el
      * el estado es 200. Si el estado no es 200, se genera un error. Si hay un error durante la API
      * llamada, se registra un mensaje de error en la consola.
    */
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
            
            setLoading(false);
            setCurrentUser(resp.data)
            return resp.data
    
        } catch (error) {
            console.error(`Error at getUserInfo ${error}`);
        
        }

    }
    
    //Eliminar usuario de lista de usuario
    /**
       * La función `deleteUser` realiza una solicitud asincrónica para eliminar un usuario con el especificado
       * userId y maneja la respuesta en consecuencia.
       * @param {string} userId - El parámetro `userId` en la función `deleteUser` es una cadena que
       * representa el identificador único del usuario que desea eliminar del sistema.
    */
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
    /**
      * La función `addUser` es una función asincrónica que envía una solicitud POST para crear un nuevo
      * usuario con las credenciales proporcionadas y maneja la respuesta en consecuencia.
      * @param {cualquier} credencial: el parámetro `credentials` en la función `addUser` probablemente contenga
      * la información del usuario que debe agregarse al sistema. Esta información podría incluir
      * detalles como el nombre de usuario, correo electrónico, contraseña o cualquier otro campo obligatorio para crear un
      * nueva cuenta de usuario. La función utiliza estas `credenciales
      * @returns La función `addUser` devuelve un objeto con una propiedad `error` que indica si
      * ocurrió un error durante la ejecución de la función. Si no ocurrió ningún error, devuelve `{ error: falso
      * }`, y si ocurrió un error, devuelve `{ error: true }`.
    */
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

    /**
      * La función updateUser en TypeScript React actualiza la información de un usuario usando un HTTP PUT
      * solicitud con manejo de errores.
      * @param {string} id: el parámetro `id` en la función `updateUser` es una cadena que representa
      * el identificador único del usuario cuya información se está actualizando.
      * @param {cualquiera} credenciales: el parámetro `credentials` en la función `updateUser` probablemente
      * contiene los datos que deben actualizarse para el usuario con el "id" especificado. Estos datos podrían
      * incluir información como el nombre de usuario, correo electrónico, contraseña o cualquier otro detalle que pueda ser
      * actualizado para un perfil de usuario.
    */
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
        <AuthContext.Provider 
            value={{ 
                users, 
                getUserInfo, 
                loading, 
                deleteUser, 
                addUser, 
                userAdded,
                userWasDeleted, 
                showUpdateModal, 
                setShowUpdateModal, 
                updateUser, 
                userWasUpdated, 
                currentUser, 
                setCurrentUser 
            }}
        >
            {children}
        </AuthContext.Provider>
    ) 

}






export const useAppContext = () => useContext(AuthContext);