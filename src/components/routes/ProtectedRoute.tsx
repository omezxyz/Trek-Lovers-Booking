
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type Props = {
allowedRoles?: Array<"admin" | "editor" | "user">;
redirectTo?: string;
};

const ProtectedRoute = ({ allowedRoles = ["admin"], redirectTo = "/" }: Props) => {
const { user, isAdmin, loading } = useAuth();
const location = useLocation();

if (loading) {
return (
<div className="p-6 text-center text-sm text-foreground/70">
Checking access…
</div>
);
}

if (!user) {
return <Navigate to={redirectTo} replace state={{ from: location }} />;
}

const roleOk = isAdmin && allowedRoles.includes("admin");
if (!roleOk) {
return <Navigate to={redirectTo} replace />;
}

return <Outlet />;
};

export default ProtectedRoute;