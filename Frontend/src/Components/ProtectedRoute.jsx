import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import LoadingState from "./LoadingState";

const ProtectedRoute = ({
  children,
  permission,
  permissions,
}) => {
  const {
    isAuthenticated,
    permissions: userPermissions,
    authLoading,
  } = useSelector((state) => state.auth);

  // Wait for authentication check
  if (authLoading) {
    return <LoadingState />
  }

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Single permission
  if (
    permission &&
    !userPermissions.includes(permission)
  ) {
    return <Navigate to="/welcome" replace />;
  }

  // Multiple permissions
  // User needs at least ONE permission
  if (
    permissions &&
    !permissions.some((requiredPermission) =>
      userPermissions.includes(requiredPermission)
    )
  ) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
};

export default ProtectedRoute;
