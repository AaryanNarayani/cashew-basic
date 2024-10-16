import { IconWallet } from "@tabler/icons-react"
import axios from "axios";
import { useEffect, useState } from "react"
import UserSkeleton from "./UserSkeleton";
import ModalComp from "./Modal";

interface AllUsers{
    id: number,
    name: string,
    email: string,
}
const Users = ()=>{
    const [users,setUsers] = useState<AllUsers[]|null>(null);
    const [loading,setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transferUser , setTransferUser] = useState<AllUsers | null>(null);
    const [amt, setAmt] = useState<number | null>(null);
    const [error,setError] = useState('');

    function handleChange(e:any){
        setAmt(e.target.value);
    }
    useEffect(()=>{
        async function getAllUsers(){
            const response = await axios.get(`http://localhost:8080/api/v1/user/all`);
            setUsers(response.data.allUsers);
            setLoading(false);
        }
        getAllUsers();
    },[])
    async function Transfer(){
        console.log("Transfering");
        if(amt == null){
            setError('Enter Amount first');
            console.log(error);
            return;
        }
        console.log("Amount is not null it is "+amt);
        try{
        const token = localStorage.getItem('token');
        console.log("Recieved token: "+token);
        console.log("Transfering via the endpoint");
        const response = await axios.post('http://localhost:8080/api/v1/txn/transfer',{
            to: transferUser?.id,
            amount: Number(amt)
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Transfer successfull");
        console.log(response.data);
        setTimeout(()=>{
            setIsModalOpen(false);
        },3000)
        }catch(e:any){
            console.log(e);
            console.log(e.response.data.message);
        }
    }
    function handleTransfer(user:AllUsers){
        setIsModalOpen(true);
        console.log(user);
        setTransferUser(user)
    }
    if(loading){
        return(
            <div>
                <UserSkeleton></UserSkeleton>
            </div>
        )
    }
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
            <ModalComp
              openModal={isModalOpen}
              setOpenModal={setIsModalOpen}
              title="Transfer Amount"
            >
              <div className="bg-black text-white/80 p-8">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="to" className="text-xl">
                      To
                    </label>
                    <input
                      type="text"
                      id="to"
                      readOnly
                      value={transferUser?.name}
                      className="w-full h-14 text-2xl bg-transparent border-2 border-white/20  focus:outline-none focus:ring-0 focus:border-purple-600 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="amt" className="text-xl">
                      Amount
                    </label>
                    <input
                      type="number"
                      id="amt"
                      autoFocus
                      onChange={(e)=>handleChange(e)}
                      className="w-full h-14 text-2xl bg-transparent border-2 border-white/20  focus:outline-none focus:ring-0 focus:border-purple-600 rounded-md"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-12">
                  <button onClick={Transfer}
                    className="bg-purple-600 hover:bg-primary-700 text-white font-medium p-3 w-[120px] rounded-md">
                    Transfer
                  </button>
                </div>
              </div>
            </ModalComp>
            <div className="overflow-y-scroll scrollbar-thumb-blue-950 scrollbar-track-transparent scrollbar-thin">
            {users?.map((user,id)=>{
                return(
                <>
                <div key={id} className="grid grid-cols-3 p-4 text-center hover:bg-blue-950/30" onClick={()=>handleTransfer(users[id])}>
                    <div className={`flex justify-start text-xl text-white/90`}>
                        {user.name}
                    </div>
                    <div className={`flex justify-start text-xl text-white/90`}>
                        {user.email}
                    </div>
                    <div className={`flex justify-start text-xl text-white/90 hover:cursor-pointer ml-2`}>
                        {<IconWallet size={30}/>}
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