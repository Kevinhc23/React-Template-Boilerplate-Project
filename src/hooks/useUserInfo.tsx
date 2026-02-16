import { useMsal } from "@azure/msal-react";
import { useQuery } from "@tanstack/react-query";

type UserInfo = {
  name: string;
  email: string;
  avatar: string | null;
  isLoading: boolean;
  isError: boolean;
};

export const useUserInfo = (): UserInfo => {
  const { instance, accounts } = useMsal();
  const account = accounts[0];

  const {
    data: avatar,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-avatar", account?.homeAccountId],
    queryFn: async () => {
      if (!account) return null;

      try {
        const response = await instance.acquireTokenSilent({
          scopes: ["User.Read"],
          account: account,
        });
        if (!response.accessToken) {
          throw new Error("Access token is empty");
        }
        const photoResponse = await fetch(
          "https://graph.microsoft.com/v1.0/me/photo/$value",
          {
            headers: {
              Authorization: `Bearer ${response.accessToken}`,
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
    enabled: !!account,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 1,
  });

  return {
    name: account?.name || "Usuario",
    email: account?.username || "",
    avatar: avatar ?? null,
    isLoading,
    isError,
  };
};
