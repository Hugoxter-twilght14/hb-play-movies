// ResultadosGrid.tsx
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function ResultadosGrid({ children }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {children}
    </div>
  );
}
