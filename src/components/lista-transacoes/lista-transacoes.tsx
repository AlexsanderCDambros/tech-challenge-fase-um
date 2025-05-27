import { ITransacao } from "@/interfaces/itransacao";
import Transacao from "./transacao/transacao";

async function getTransacoes(quantidade?: number): Promise<ITransacao[]> {
  try {
    const res = await fetch('http://127.0.0.1:3001/transacoes?_sort=-data' + (quantidade ? `&_limit=${quantidade}` : ''));
    return res.json()
  } catch (error) {
    return []; 
  }  
}

export default async function ListaTransacoes({quantidade}: {quantidade?: number}) {
  const transacoes: ITransacao[] = await getTransacoes(quantidade);

  if (!transacoes || transacoes.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center pt-(--m)">
          <p className="text-[length:var(--texto-m)]">Não foi possível buscar as suas transações</p>
          <p className="text-[length:var(--texto-m)]">Por favor, tente novamente mais tarde</p>
        </div>
      )
  }

  return (
    <ul>
        {
          transacoes.map((transacao: ITransacao) => (
            <Transacao key={transacao.id} transacao={transacao}></Transacao>
          ))
        }
    </ul>
  )
}