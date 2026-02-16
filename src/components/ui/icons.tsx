import * as React from "react";

export const MicrosoftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => (
  <svg className="h-5 w-5" viewBox="0 0 23 23" {...props}>
    <path fill="#f3f3f3" d="M0 0h11v11H0z" />
    <path fill="#f3f3f3" d="M12 0h11v11H12z" />
    <path fill="#f3f3f3" d="M0 12h11v11H0z" />
    <path fill="#f3f3f3" d="M12 12h11v11H12z" />
    <rect width={10} height={10} fill="#f25022" />
    <rect width={10} height={10} x={11} fill="#7fbb00" />
    <rect width={10} height={10} y={11} fill="#00a1f1" />
    <rect width={10} height={10} x={11} y={11} fill="#ffbb00" />
  </svg>
);
