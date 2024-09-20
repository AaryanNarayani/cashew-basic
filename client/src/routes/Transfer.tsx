import { IconSearch } from "@tabler/icons-react"
import SideRouter from "../components/SideRouter"
import Users from "../components/Users"

const Transfer = ()=>{
    return(
    <>
    <div className="bg-maindark flex w-full">
        <SideRouter/>
        <div className="text-white p-4 flex-1 flex-col">
          <div className="text-3xl m-2 flex flex-col">
            <div className="font-semibold mt-2">Transfer Funds</div>
            <span className="text-xl mt-2 text-white/80">
              {" "}
              Send money to other Users
            </span>
          </div>
          <div className="flex gap-4 border border-blue-950/50 p-4 mt-10 rounded-md md:w-[600px] w-[400px] hover:border-blue-950/90">
            <IconSearch/>
            <input type="text" placeholder="Search for users.." className="bg-transparent h-6 text-xl outline-none md:w-[550px] w-[350px]"></input>
          </div>
          <div className="mt-5">
            <Users/>
          </div>
        </div>
    </div>
    </>
    
    )
}
export default Transfer