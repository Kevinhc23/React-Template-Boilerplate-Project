import { useMsalAuth } from "@/hooks/useMsalAuth";
import { useQuery } from "@tanstack/react-query";

type UserInfo = {
  name: string;
  email: string;
  avatar: string | null;
  isLoading: boolean;
  isError: boolean;
};

export const useUserInfo = (): UserInfo => {
  const { activeAccount, getAccessToken } = useMsalAuth();

  const {
    data: avatar,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-avatar", activeAccount?.homeAccountId],
    queryFn: async () => {
      if (!activeAccount) return null;

      try {
        const accessToken = await getAccessToken(["User.Read"]);
        if (!accessToken) {
          throw new Error("Access token is empty");
        }
        const photoResponse = await fetch(
          "https://graph.microsoft.com/v1.0/me/photo/$value",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (photoResponse.status === 404) return null;

        if (!photoResponse.ok) {
          throw new Error("Failed to fetch profile picture");
        }

        const blob = await photoResponse.blob();
        return URL.createObjectURL(blob);
      } catch (error) {
        throw error;
      }
    },
    enabled: !!activeAccount,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 1,
  });

  return {
    name: activeAccount?.name || "Usuario",
    email: activeAccount?.username || "",
    avatar: avatar ?? null,
    isLoading,
    isError,
  };
};
