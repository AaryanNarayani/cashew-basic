const UserSkeleton = () => {
    return (
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
                    {[1, 2, 3, 4, 5].map((id) => {
                        return (
                            <div key={id}>
                                <div className="grid grid-cols-3 p-4 gap-2 text-center hover:bg-blue-950/30">
                                    <div className="flex justify-start text-xl w-full bg-blue-950/60 animate-pulse">
                                        &nbsp;
                                    </div>
                                    <div className="flex justify-start text-xl w-full bg-blue-950/60 rounded-md animate-pulse h-6">
                                        &nbsp;
                                    </div>
                                    <div className="flex justify-start text-xl w-full bg-blue-950/60 rounded-md animate-pulse h-6">
                                        &nbsp;
                                    </div>
                                </div>
                                <hr className="border-blue-950/70" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default UserSkeleton;
