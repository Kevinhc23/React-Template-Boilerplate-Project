import { Button } from "@/components/ui/button";
import { useLoadingStore } from "@/app/store/useLoadingStore";
import { useNavigate } from "react-router";
const SignInPage = () => {
  const showLoading = useLoadingStore((state) => state.showLoading);
  const hideLoading = useLoadingStore((state) => state.hideLoading);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    showLoading("Verify credentials...");

    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error to sign in", error);
      alert("Error to sign in");
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
      <div className="p-8 bg-white shadow-xl rounded-2xl border border-slate-100 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-slate-800 text-center">
          Welcome
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
