import { Navigate } from "react-router-dom";
import useLoginStore from "../store/loginstore";

const ProtectedRoute = ({ children }) => {
  const { auth } = useLoginStore();

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;