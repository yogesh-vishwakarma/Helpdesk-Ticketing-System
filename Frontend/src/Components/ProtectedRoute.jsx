import { Navigate } from "react-router";
import { useSelector } from "react-redux";

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
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
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
