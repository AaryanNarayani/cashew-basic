import { IconWallet } from "@tabler/icons-react"
import axios from "axios";
import { useEffect, useState } from "react"

interface AllUsers{
    name: string,
    email: string,
}
const Users = ()=>{
    const [users,setUsers] = useState<AllUsers[]|null>(null);
    const [loading,setLoading] = useState(true);
    const skeleton = `bg-blue-950/30 w-[100px]`;

    useEffect(()=>{
        async function getAllUsers(){
            const response = await axios.get(`http://localhost:8080/api/v1/user/all`);
            setUsers(response.data.allUsers);
            setLoading(false);
        }
        getAllUsers();
    },[])
    return(
        <>
        <div className="flex flex-col bg-transparent border w-full h-[400px] border-blue-950/70 rounded-md">
            <div className="grid grid-cols-3 mt-2 p-4 text-center">
                <div className="flex justify-start text-xl text-white/60">
                    Name
                </div>
                <div className="flex justify-start text-xl text-white/60">
                    Email
                </div>
                <div className="flex justify-start text-xl text-white/60">
                    Send
                </div>
            </div>
            <hr className="border-blue-950/70" />
            <div className="overflow-y-scroll scrollbar-thumb-blue-950 scrollbar-track-transparent scrollbar-thin">
            {users?.map((user,id)=>{
                return(
                    <>
                    <div key={id} className="grid grid-cols-3 p-4 text-center hover:bg-blue-950/30">
                    <div className={`flex justify-start text-xl text-white/90 ${loading? skeleton:''}`}>
                        {loading? '' :user.name}
                    </div>
                    <div className={`flex justify-start text-xl text-white/90`}>
                        {loading? '' :user.email}
                    </div>
                    <div className={`flex justify-start text-xl text-white/90 hover:cursor-pointer ml-2`}>
                        {loading? ``: <IconWallet size={30}/>}
                    </div>
                </div>
                <hr className="border-blue-950/70" />
                </>
                )
            })}
            </div>
        </div>

        </>
    )
}
export default Users