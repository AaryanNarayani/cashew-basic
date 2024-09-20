import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
interface AccountProps{
    bordered : boolean,
}

const Account = ({bordered}:AccountProps)=>{
    const [email,setEmail] = useState<string|null>("");
    const [avatar, setAvatar] = useState<string>(""); 
    const [loading,setLoading] = useState<boolean>(true);
    let borderStyle = `p-2 rounded-sm border border-bg-white/20`;
    if(!bordered){borderStyle = ``;}
    useEffect(()=>{
        async function GetUserDetails(){
        try{
            const userId = localStorage.getItem('userId'); 
            const response = await axios.get(`http://localhost:8080/api/v1/user/${userId}`)
            const userEmail = response.data.details.email;
            const avatar = response.data.details.name[0];
            setEmail(userEmail);
            setAvatar(avatar);
            setLoading(false);
        }catch(e){
            console.log("Error Occured fetching User Data"+e);
        }
        }
        GetUserDetails();
    },[])
    return(
    <>  <Link to={'/profile'}>
        <div className={`flex items-center hover:cursor-pointer ${borderStyle}`}>
            <div className="flex justify-center items-center bg-blue-700 h-8 w-8 rounded-full">
                {loading? 'X': avatar}
            </div>
            <div className="flex justify-center items-center ml-2">
                {loading? 'loading@email.com...' : email}
            </div>
            <div className="flex h-8 w-12 bg-blue-950/40 rounded-lg text-blue-800 text-sm justify-center items-center ml-4">
                {loading? '..': 'You'}
            </div>
            <div className="ml-2">
                {bordered? 'o':''}
            </div>
        </div>
        </Link>
    </>
    )
}
export default Account