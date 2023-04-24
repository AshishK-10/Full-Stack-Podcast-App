import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const logout = () => {
      window.location.reload();
      localStorage.clear();
      navigate("/");
  };
  useEffect(() => {
    logout();
  });
  return <div>Logging out...</div>;
};

export default Logout;
