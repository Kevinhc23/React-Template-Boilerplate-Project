import type { JSX, ReactNode } from "react";
import { TanStackProvider } from "@/app/providers/TanStackProvider";

type Props = { children: ReactNode };
type Provider = (p: Props) => JSX.Element;

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

const AppProviders = composeProviders(TanStackProvider);

export default AppProviders;
