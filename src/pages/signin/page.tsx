import { useEffect, type FC } from "react";
import { Button } from "@/components/ui/button";
import { useMsal } from "@azure/msal-react";
import { useLoadingStore } from "@/app/store/useLoadingStore";

const SignInPage: FC = () => {
  const { instance } = useMsal();
  const showLoading = useLoadingStore((state) => state.showLoading);
  const hideLoading = useLoadingStore((state) => state.hideLoading);

  useEffect(() => {
    const accounts = instance.getAllAccounts();
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
      instance.loginRedirect({
        scopes: ["User.Read"],
        redirectUri: window.location.origin,
        prompt: "select_account",
      });
      console.log("[SignInPage] Active account set to:", accounts[0].username);
    }
  }, [instance]);

  const handleSignIn = async () => {
    showLoading("Autenticando con Microsoft...");
    try {
      console.log("[SignInPage] Initiating loginRedirect");
      await instance.loginRedirect({
        scopes: ["User.Read"],
        redirectUri: window.location.origin,
        prompt: "select_account",
      });
    } catch (error) {
      console.error("MSAL Login Error:", error);
      hideLoading();
    }
  };

  return (
    <div className="flex min-h-dvh w-full bg-white">
      {/* Lado Izquierdo: Branding & Visuals (Oculto en móviles) */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-primary p-12 lg:flex">
        {/* Fondo decorativo con gradiente suave */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute -left-[10%] -top-[10%] h-[60%] w-[60%] rounded-full bg-primary/20 blur-[120px]" />
        </div>

        <div className="relative z-10 flex items-center gap-2 text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">Taskora</span>
        </div>

        <div className="relative z-10">
          <blockquote className="space-y-4">
            <p className="text-4xl font-medium leading-tight text-slate-100">
              "La automatización de procesos nunca fue tan transparente y
              eficiente."
            </p>
            <footer className="text-lg text-white">
              Infrastructure Operations Team
            </footer>
          </blockquote>
        </div>

        <div className="relative z-10 text-sm text-white">
          © 2026 Taskora System Corp. Todos los derechos reservados.
        </div>
      </div>

      {/* Lado Derecho: Formulario de Login */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-[420px] space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Iniciar Sesión
            </h2>
            <p className="text-slate-500">
              Utiliza tu cuenta corporativa para acceder a las estadísticas de
              KPI.
            </p>
          </div>

          <div className="space-y-6">
            <Button
              onClick={handleSignIn}
              variant="default"
              className="group relative flex h-14 w-full items-center justify-center gap-4 rounded-xl border-slate-200 bg-white px-6 text-base font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
            >
              {/* Logo de Microsoft Original Colors */}
              <svg className="h-5 w-5" viewBox="0 0 23 23">
                <path fill="#f3f3f3" d="M0 0h11v11H0z" />
                <path fill="#f3f3f3" d="M12 0h11v11H12z" />
                <path fill="#f3f3f3" d="M0 12h11v11H0z" />
                <path fill="#f3f3f3" d="M12 12h11v11H12z" />
                {/* Los colores de Microsoft se pueden añadir aquí si se prefiere */}
                <rect width="10" height="10" fill="#f25022" />
                <rect width="10" height="10" x="11" fill="#7fbb00" />
                <rect width="10" height="10" y="11" fill="#00a1f1" />
                <rect width="10" height="10" x="11" y="11" fill="#ffbb00" />
              </svg>
              Continuar con Microsoft SSO
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400 tracking-widest">
                  Seguridad Empresarial
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <div className="flex gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3 w-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-xs leading-relaxed text-slate-600">
                  Su inicio de sesión está protegido por políticas de acceso
                  condicional y autenticación multifactor (MFA).
                </p>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-slate-400">
            ¿Problemas con el acceso?{" "}
            <a href="#" className="font-semibold text-primary hover:underline">
              Contactar a IT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
