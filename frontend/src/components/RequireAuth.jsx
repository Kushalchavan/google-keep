import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <div>
        <LoaderCircle className="animate-spin" />
      </div>
    );

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
export default RequireAuth;
