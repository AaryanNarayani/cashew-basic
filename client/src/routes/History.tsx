import { useState } from "react";
import SideRouter from "../components/SideRouter";


const History = () => {
const [users,setUsers] = useState<null[]>([]);
const [loading,setLoading] = useState(true);
const skeleton = `bg-blue-950/30 w-[100px]`;
  return (
    <>
      <div className="bg-maindark flex w-full">
        <SideRouter />
        <div className="text-white p-4 flex-1 flex-col">
          <div className="text-3xl m-2 flex flex-col">
            <div className="font-semibold mt-2">Transaction History</div>
            <span className="text-xl mt-2 text-white/80">
              {" "}
              Explore your wallet history
            </span>
          </div>
          <div className="mt-10 flex flex-col bg-transparent border w-full h-[600px] border-blue-950/70 rounded-md">
          <div className="grid grid-cols-5 mt-2 p-4 text-center">
                <div className="flex justify-start text-xl text-white/60">
                    From
                </div>
                <div className="flex justify-start text-xl text-white/60">
                    To
                </div>
                <div className="flex justify-start text-xl text-white/60">
                    Amount
                </div>
                <div className="flex justify-start text-xl text-white/60">
                    Date
                </div>
                <div className="flex justify-start text-xl text-white/60">
                    Time
                </div>
            </div>
            <hr className="border-blue-950/70" />
            <div className="overflow-y-scroll scrollbar-thumb-blue-950 scrollbar-track-transparent scrollbar-thin">
            {users?.map((user,id)=>{
                return(
                    <>
                    <div key={id} className="grid grid-cols-3 p-4 text-center hover:bg-blue-950/30">
                    <div className={`flex justify-start text-xl text-white/90 ${loading? skeleton:''}`}>
                        {/* {loading? '' :user.name} */}
                    </div>
                    <div className={`flex justify-start text-xl text-white/90`}>
                        {/* {loading? '' :user.email} */}
                    </div>
                    <div className={`flex justify-start text-xl text-white/90 hover:cursor-pointer ml-2`}>
                        {/* {loading? ``: < size={30}/>} */}
                    </div>
                </div>
                <hr className="border-blue-950/70" />
                </>
                )
            })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default History;
