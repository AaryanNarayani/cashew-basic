import React, { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import Error from "../routes/Error";

interface AuthHOCProps {
  children: ReactNode;
}

const AuthHOC: React.FC<AuthHOCProps> = ({ children }) => {
  const [isValidated, setIsValidated] = useState<boolean | null>(null);

  useEffect(() => {
    async function validateUser() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:8080/api/v1/user/validate', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        localStorage.setItem("userId",response.data.id);
        setIsValidated(true);
      } catch (e) {
        console.error("Error occurred validating the user:", e);
        setIsValidated(false);
      }
    }

    validateUser();
  }, []);

  if (isValidated === null) {
    return <div>Loading...</div>;
  }

  return isValidated ? <>{children}</> : <Error type="AuthError"/>;
};

export default AuthHOC;