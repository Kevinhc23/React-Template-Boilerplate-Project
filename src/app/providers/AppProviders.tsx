import type { ComponentType, ReactNode } from "react";
import { TanStackProvider } from "@/app/providers/TanStackProvider";
import ErrorBoundary from "@/components/widgets/ErrorBoundary";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "@/shared/config/auth";
import { PublicClientApplication } from "@azure/msal-browser";

type Props = { children: ReactNode };
type Provider = ComponentType<Props>;

/**
 * Composes multiple provider components into a single provider.
 * @param p - The provider components to compose.
 * @returns A single provider component.
 */
const composeProviders = (...p: Provider[]) =>
  p.reduceRight(
    (Acc, P) =>
      ({ children }: Props) => (
        <P>
          <Acc>{children}</Acc>
        </P>
      ),
    ({ children }: Props) => <>{children}</>,
  );

/**
 * Initialize the MSAL instance.
 */
export const msalInstance = new PublicClientApplication(msalConfig);

/**
 * Compose the providers.
 */
const AppProviders = composeProviders(
  ErrorBoundary,
  TanStackProvider,
  (props) => (
    <MsalProvider instance={msalInstance}>{props.children}</MsalProvider>
  ),
);

export default AppProviders;
