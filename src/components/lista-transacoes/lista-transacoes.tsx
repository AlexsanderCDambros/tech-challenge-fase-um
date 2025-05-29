'use client';
import { ITransacao } from "@/interfaces/itransacao";
import Transacao from "./transacao/transacao";
import { getTransacoes } from "@/utils/transacoes";
import { useEffect, useState } from "react";

export default function ListaTransacoes({quantidade, podeEditar}: {quantidade?: number, podeEditar?: boolean}) {
  const [transacoes, setTransacoes] = useState<ITransacao[]>([]);
  const [atualizar, setAtualizar] = useState<boolean>(false);

  const buscaTransacoes = async () => {
    const transacoes: ITransacao[] = await getTransacoes(quantidade);
    setTransacoes(transacoes);
  }
  
  useEffect(() => {
    buscaTransacoes();
  }, 
  [atualizar]);

  const atualizarTransacoes = () => {
    setAtualizar(!atualizar);
  }

  if (!transacoes || transacoes.length === 0) {
    return (
        <div className="flex flex-col sm:items-center sm:justify-center py-(--m)">
          <p className="text-[length:var(--texto-m)]">Não foi possível buscar as suas transações</p>
          <p className="text-[length:var(--texto-m)]">Por favor, insira uma nova transação</p>
        </div>
      )
  }

  return (
    <ul>
        {
          transacoes.map((transacao: ITransacao) => (
            <Transacao 
              key={transacao.id} 
              transacao={transacao} 
              podeEditar={podeEditar}
              onExclusao={atualizarTransacoes}
            ></Transacao>
          ))
        }
    </ul>
  )
}