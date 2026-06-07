import { Navigate } from "react-router-dom";
import { useSessionStore } from "@/entities/session/model/session-store";
import { LoginForm } from "@/features/auth/login/ui/login-form";
import { ROUTES } from "@/shared/config/route-paths";

export default function LoginPage() {
    const isAuthenticated = useSessionStore((s) => s.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to={ROUTES.DASHBOARD} replace />;
    }

    // return (
    //   <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
    //     <LoginForm />
    //   </div>
    // )
    return (
        <div className="min-h-screen bg-muted/40 p-4">
            <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-8">
                <LoginForm />
            </div>
        </div>
    );
}
