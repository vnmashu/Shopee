import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext ,useEffect,useState,useContext} from "react";

const context=createContext(null)

export default function AuthProvider({children}){
    const [user,setUser]=useState(null)
    useEffect(()=>{
        const getJWT=async()=>{
            try{
                const token=await AsyncStorage.getItem('jwt')
                const tokenVal=token!=null?JSON.parse(token):null
                setUser(tokenVal)
            }
            catch(err){
                console.log(err)
            }
        }
        getJWT()
    },[])
    return(
        <context.Provider value={{user,setUser}}>
            {children}
        </context.Provider>
    )
}

export const useAuth=()=>useContext(context)