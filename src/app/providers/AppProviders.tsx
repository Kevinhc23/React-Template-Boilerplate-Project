import type { JSX, ReactNode } from "react";

type Props = { children: ReactNode };
type Provider = (p: Props) => JSX.Element;

export const composeProviders = (...p: Provider[]) =>
  p.reduceRight(
    (Acc, P) =>
      ({ children }: Props) => (
        <P>
          <Acc>{children}</Acc>
        </P>
      ),
    ({ children }: Props) => <>{children}</>,
  );

export const AppProviders = composeProviders();
