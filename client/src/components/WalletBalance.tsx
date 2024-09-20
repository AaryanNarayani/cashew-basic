import axios from "axios";
import { useEffect, useState } from "react"

const WalletBalance = ()=>{
    const [balance , setBalance ] = useState<number|null>(null);
    const userId = localStorage.getItem('userId');
    useEffect(()=>{
        async function getBalance(userId:string|null){
            try{
            console.log(userId);
            if(!userId){
                throw Error
            }
            const response = await axios.get(`http://localhost:8080/api/v1/user/${userId}/balance`);
            console.log(response.data);
            setBalance(response.data.balance);
            }catch(e){
            console.log('Error Occured in Fetching the Balance'+e);
            } 
        };
        getBalance(userId);
        const interval = setInterval(()=>{
            getBalance(userId);
        },60000)

        return ()=>clearInterval(interval);
    },[userId])
    return(
        <div className="bg-maindark border min-w-full h-32 flex flex-col border-blue-950/70 rounded-md mt-5">
            <div className="flex flex-col justify-start mt-6 ml-6">
            <div className="text-white/80 justify-start text-xl">
                Wallet Balance
            </div>
            <div className="font-medium text-4xl mt-2">
                ₹{balance !==null ? `${balance}`: `...`}
            </div>
            </div>
        </div>
    )
}
export default WalletBalance