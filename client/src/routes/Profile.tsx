import { useEffect, useState } from "react";
import SideRouter from "../components/SideRouter";
import axios from "axios";

interface UserDetails {
  email: string;
  id: number;
  name: string;
}
const Profile = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [modify, setModify] = useState(false);
  useEffect(() => {
    async function getUserDetails() {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `http://localhost:8080/api/v1/user/${userId}`
      );
      setUserDetails(response.data.details);
    }
    getUserDetails();
  }, []);
  async function modifyUserDetails(){
    console.log(userDetails);
    const token = localStorage.getItem("token");
    try{
    const res = await axios.put('http://localhost:8080/api/v1/user/update',{
      id: userDetails?.id,
      email: userDetails?.email,
      name: userDetails?.name
    },{
      headers:{
        authorization: `Bearer ${token}`,
      }
    })
    console.log(res.data);
    }catch(e){
      console.log("Error happened"+e);
    }
  }
  function handleModify(){setModify(prev=>!prev);}
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserDetails((prevDetails) => {
      if (prevDetails) {
        return { ...prevDetails, [id]: value };
      }
      return prevDetails;
    });
  };
  return (
    <>
      <div className="bg-maindark flex w-full">
        <SideRouter />
        <div className="text-white p-4 flex-1 flex-col">
          <div className="text-3xl m-2 flex flex-col">
            <div className="font-semibold mt-2">My Details</div>
            <div className="text-xl mt-2 flex gap-2 text-white/80">
              {" "}
              Manage your profile details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`size-6 hover:cursor-pointer hover:stroke-slate-400 ${modify ? "stroke-purple-600" : ""}`}
                onClick={handleModify}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </div>
          </div>
          <div className="mt-10 ml-5">
            <div className="mt-2 flex flex-col">
              <label htmlFor="name" className="text-white/80">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                readOnly={!modify}
                value={userDetails?.name || ""}
                onChange={handleInputChange}
                className="mt-2 bg-transparent border appearance-none border-blue-950/50 rounded-md p-3 outline-none hover:cursor-text hover:border-blue-950/90 text-2xl w-[400px] md:w-[600px]"
              />
            </div>
            <div className="mt-2 flex flex-col">
              <label htmlFor="email" className="text-white/80">
                Your Email
              </label>
              <input
                type="text"
                id="email"
                readOnly={!modify}
                value={userDetails?.email || ""}
                onChange={handleInputChange}
                className="mt-2 bg-transparent border appearance-none border-blue-950/50 rounded-md p-3 outline-none hover:cursor-text hover:border-blue-950/90 text-2xl w-[400px] md:w-[600px]"
              />
            </div>
          </div>
          <div className="mt-8">
            <button
              className="bg-primary-700 p-4 text-white rounded-md w-[150px] h-12 flex justify-center items-center
                hover:bg-primary-700/80 hover:text-white/80"
              onClick={() => modifyUserDetails()}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
