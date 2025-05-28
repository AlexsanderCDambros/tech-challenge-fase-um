import { formatDate } from "@/utils/format-date";
import { ITransacao } from "@/interfaces/itransacao";
import Link from "next/link";
import ExcluirTransacao from "./excluirTransacao";

export default function Transacao({transacao}: {transacao: ITransacao}) {
  return (
    <li>
        <div className="flex flex-col gap-(--m) sm:flex-row sm:justify-between sm:items-center sm:gap-(--gg) border-b-(--texto-fundo-claro) border-b-[1px] pb-(--p) mb-(--p)">
          <div className="flex w-full flex-row justify-between items-center">
            <div className="flex flex-col w-max">
              <p className="text-[length:var(--texto-m)]">{transacao.descricao}</p>
              <p className="text-[length:var(--texto-p)]">{transacao.tipo}</p>
            </div>
            <div className="flex flex-col sm:items-end">
              <p className="text-[length:var(--texto-m)]">R$ {transacao.valor.toFixed(2)}</p>
              <p className="text-[length:var(--texto-p)]">{formatDate(transacao.data)}</p>
            </div>
          </div>
          <div className="flex justify-end sm:justify-between items-center gap-(--p)">
            <Link
              href={`/transacao/${transacao.id}`}
            >
              <button className="botao-primario">Editar</button>
            </Link>
            <ExcluirTransacao transacao={transacao}></ExcluirTransacao>
          </div>
        </div>
    </li>
  )
}