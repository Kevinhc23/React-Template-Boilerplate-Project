import { useEffect, type FC } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useMsalAuth } from "@/hooks/useMsalAuth";
import { useLoadingStore } from "@/app/store/useLoadingStore";
import LoadingOverlay from "@/components/widgets/LoadingOverlay";
import { BancoGuayaquilIcon, MicrosoftIcon } from "@/components/ui/icons";
import { Lock } from "lucide-react";

const SignInPage: FC = () => {
  const { inProgress, isAuthenticated, login } = useMsalAuth();
  const navigate = useNavigate();
  const showLoading = useLoadingStore((state) => state.showLoading);
  const hideLoading = useLoadingStore((state) => state.hideLoading);

  useEffect(() => {
    if (inProgress === "none" && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [inProgress, isAuthenticated, navigate]);

  const handleSignIn = async () => {
    showLoading("Authenticating with Microsoft...");
    try {
      await login();
    } catch (error) {
      console.error("MSAL Login Error:", error);
    } finally {
      hideLoading();
    }
  };

  if (inProgress !== "none" || isAuthenticated) {
    return <LoadingOverlay />;
  }

  return (
    <div className="flex min-h-dvh w-full bg-white">
      {/* Lado Izquierdo: Branding & Visuals (Oculto en móviles) */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-primary p-12 lg:flex">
        {/* Fondo decorativo con gradiente suave */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute -left-[10%] -top-[10%] h-[60%] w-[60%] rounded-full bg-primary/20 blur-[120px]" />
        </div>

        <div className="relative z-10 flex items-center gap-2 text-white">
          <BancoGuayaquilIcon className="w-24" />
        </div>

        <div className="relative z-10">
          <blockquote className="space-y-4">
            <p className="text-4xl font-medium leading-tight text-slate-100">
              "The automation of processes has never been so transparent and
              efficient."
            </p>
            <footer className="text-lg text-white">
              Research And Development Team
            </footer>
          </blockquote>
        </div>

        <div className="relative z-10 text-sm text-white">
          © 2026 Taskora Platform | Powered by Banco Guayaquil
        </div>
      </div>

      {/* Lado Derecho: Formulario de Login */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-[420px] space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Sign In
            </h2>
            <p className="text-slate-500">
              Use your corporate account to access the application.
            </p>
          </div>

          <div className="space-y-6">
            <Button
              onClick={handleSignIn}
              variant="default"
              className="group relative flex h-14 w-full items-center justify-center gap-4 rounded-sm border-slate-100 bg-white px-6 text-base font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] border cursor-pointer"
            >
              <MicrosoftIcon />
              Continue with Microsoft SSO
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400 tracking-widest">
                  Business Security
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <div className="flex gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <Lock className="h-3 w-3" />
                </div>
                <p className="text-xs leading-relaxed text-slate-600">
                  Your login is protected by conditional access policies and
                  multi-factor authentication (MFA).
                </p>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-slate-400">
            Problems with access?{" "}
            <Link
              to="/contact"
              className="font-semibold text-primary hover:underline"
              viewTransition
              aria-label="Contact IT"
            >
              Contact IT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
