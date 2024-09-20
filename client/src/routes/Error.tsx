import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ErrorProps {
    type?: 'AuthError' | 'GeneralError'; 
}

const Error = ({ type }: ErrorProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        let timer:any;
        
        if (type === 'AuthError') {
            timer = setTimeout(() => {
                navigate('/signin');
            }, 5000);
        }

        return () => {
            if (timer) clearTimeout(timer); 
        };
    }, [type, navigate]);

    const getMessage = () => {
        if (type === 'AuthError') {
            return "Authentication | You are not logged in. Please Sign in/Sign up.";
        } else {
            return "Error | An Unexpected Error Occurred. Please try again later.";
        }
    };

    return (
        <div className="bg-black text-white flex justify-center items-center h-screen text-2xl font-mono">
            {getMessage()}
        </div>
    );
}

export default Error;
