import { useState } from "react"
import Account from "./Account"
import axios from "axios";

const DepositCard = ()=>{
    const [amount , setAmount] = useState<string>("");
    async function AddMoney(){
    try{
        const amt = Number(amount);
        console.log(amt);
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://localhost:8080/api/v1/txn/deposit`,{
            amount: amt
        },{
            headers:{
                Authorization: `Bearer ${token}`
            },
        });
        console.log(response.data);
        setAmount('');
    }catch(e){
        console.log("Couldnt Deposit Amount"+e)
    }
    }
    function handleClick(){ AddMoney(); }
    return(
    <>
        <div className="bg-maindark border lg:w-[700px] md:w-full h-[340px] flex flex-col border-blue-950/80 rounded-md mt-5">
            <div className="flex flex-col justify-start mt-6 ml-6">
            <div className="text-white font-semibold justify-start text-3xl">
                Deposit
            </div>
            <div className="font-normal mt-2 text-white/80">
                Add money to your Wallet
            </div>
            <div className="mt-10">
                <input type="number" value={amount} className="bg-transparent border appearance-none border-blue-950/50 rounded-md p-3 outline-none hover:cursor-text hover:border-blue-950/90 text-2xl w-[600px]"
                onChange={(e)=>setAmount(e.target.value)}/>
            </div>
            <div className="mt-4">
                <button className="bg-primary-700 p-4 text-white rounded-md w-[150px] h-12 flex justify-center items-center
                hover:bg-primary-700/80 hover:text-white/80"
                onClick={handleClick}>
                Add Money
                </button>
            </div>
            <div className="flex justify-end mr-5 mt-4">
                <Account bordered={false}/>
            </div>
            </div>
        </div>
    </>
    )
}
export default DepositCard