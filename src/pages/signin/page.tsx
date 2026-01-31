import Button from "@/components/ui/button";
import { useLoadingStore } from "@/app/store/useLoadingStore";
import { useEffect } from "react";

const SignInPage = () => {
  const showLoading = useLoadingStore((state) => state.showLoading);
  const hideLoading = useLoadingStore((state) => state.hideLoading);

  useEffect(() => {
    setTimeout(() => {
      hideLoading();
    }, 2000);
  }, [hideLoading]);
  return (
    <div>
      <Button
        variant="primary"
        size="md"
        label="Sign In"
        onClick={() => {
          showLoading("Signing in...");
        }}
      />
    </div>
  );
};

export default SignInPage;
