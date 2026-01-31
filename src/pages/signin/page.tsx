import { Button } from "@/components/ui/button";
import { useLoadingStore } from "@/app/store/useLoadingStore";
import { useNavigate } from "react-router"; // O tu router preferido

const SignInPage = () => {
  throw new Error("Error al iniciar sesión");

  const showLoading = useLoadingStore((state) => state.showLoading);
  const hideLoading = useLoadingStore((state) => state.hideLoading);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    // 1. Activamos el overlay con un mensaje personalizado
    showLoading("Verificando credenciales...");

    try {
      // 2. Simulamos la llamada a la API (POST)
      // En un caso real sería: const res = await fetch('/api/login', { method: 'POST', ... })
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulamos éxito (puedes cambiar a reject para probar el error)
          resolve(true);
        }, 2000);
      });

      // 3. Si todo sale bien, redirigimos
      navigate("/dashboard");
    } catch (error) {
      // 4. Manejo de errores (opcional: mostrar un toast de error aquí)
      console.error("Error al iniciar sesión:", error);
      alert("Error al conectar con el servidor");
    } finally {
      // 5. IMPORTANTE: Ocultamos el loading pase lo que pase
      hideLoading();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
      <div className="p-8 bg-white shadow-xl rounded-2xl border border-slate-100 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-slate-800 text-center">
          Bienvenido
        </h1>

        <Button
          variant="default"
          size="lg"
          onClick={handleSignIn}
          className="w-full"
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default SignInPage;
