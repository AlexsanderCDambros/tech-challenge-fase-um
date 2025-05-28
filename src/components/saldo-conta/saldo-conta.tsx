import { ISaldoConta } from "@/interfaces/isaldo-conta";
import { getSaldo } from "@/utils/saldo-conta-corrente";

export default async function SaldoConta() {
  const saldo: ISaldoConta | undefined= await getSaldo();

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