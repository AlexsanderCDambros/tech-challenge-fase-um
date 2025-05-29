'use client';
import { ISaldoConta } from "@/interfaces/isaldo-conta";
import { getSaldo } from "@/utils/saldo-conta-corrente";
import { useEffect, useState } from "react";

export default function SaldoConta() {
  const [saldo, setSaldo] = useState<ISaldoConta | undefined>(undefined);

  const buscaSaldo = async () => {
    const saldo: ISaldoConta | undefined = await getSaldo();
    setSaldo(saldo);
  }

  useEffect(() => {
    buscaSaldo();
  }, []);

  if (!saldo) {
    return (
        <>
          <p className="w-max">Saldo da conta corrente</p>
          <p className="text-[length:var(--texto-g)]">Indisponível</p>
        </>
      )
  }

  return (
    <>
        <p className="w-max">Saldo da conta corrente</p>
        <p className="text-[length:var(--texto-g)]">R$ {Number(saldo.total).toFixed(2)}</p>
    </>
  )
}