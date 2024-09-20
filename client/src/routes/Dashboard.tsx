import DepositCard from "../components/DepositCard";
import SideRouter from "../components/SideRouter";
import WalletBalance from "../components/WalletBalance";

const Dashboard = () => {
  return (
    <>
      <div className="bg-maindark flex w-full">
        <SideRouter/>
        <div className="text-white p-4 flex-1 flex-col">
          <div className="text-3xl m-2 flex flex-col">
            <div className="font-semibold mt-2">Dashboard</div>
            <span className="text-xl mt-2 text-white/80">
              {" "}
              An overview of your wallet
            </span>
          </div>
          <div className="min-w-full mt-4">
            <WalletBalance />
          </div>
          <div className="mt-2">
            <DepositCard />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;

