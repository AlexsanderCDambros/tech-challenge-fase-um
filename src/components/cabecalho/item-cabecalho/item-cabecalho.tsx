'use client';

import { ItemCabecalho } from "@/interfaces/item-cabecalho";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ItemCabecalhoComponent({ item }: { item: ItemCabecalho } ) {
  const pathname =  usePathname();

  return (
    <Link 
      href={item.rota} 
      className={`no-underline text-[length:var(--texto-g)] text-(--texto-fundo-escuro) hover:text-(--texto-fundo-escuro) ${pathname === item.rota ? 'border-b-3 border-b-(texto-fundo-escuro)' : ''}`}
    >
      <span>{item.nome}</span>
    </Link>
  )
}