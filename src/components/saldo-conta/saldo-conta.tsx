import { ISaldoConta } from "@/interfaces/isaldo-conta";

async function getSaldo(): Promise<ISaldoConta[]>  {
  try {
    const res = await fetch('http://127.0.0.1:3001/conta-corrente');
    return res.json()
  } catch (error) {
    return []; 
  }  
}

export default async function SaldoConta() {
  const saldo: ISaldoConta[] = await getSaldo();

  if (!saldo || saldo.length === 0) {
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
        <p className="text-[length:var(--texto-g)]">R$ {saldo[0].total.toFixed(2)}</p>
    </>
  )
}