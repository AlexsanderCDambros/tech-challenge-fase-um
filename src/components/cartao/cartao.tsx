import { ReactNode } from "react";

interface CartaoProps {
  classeAdicional?: string;
  children: ReactNode;
}

export default function Cartao({ classeAdicional, children }: CartaoProps) {
  return (
    <div className={`shadow-(--sombra-card) p-(--m) rounded-(--canto-card) ${classeAdicional || ''}`}>
        { children ? children : '' }
    </div>
  )
}