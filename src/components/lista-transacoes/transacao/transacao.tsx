import { formatDate } from "@/utils/format-date";
import { ITransacao } from "@/interfaces/itransacao";
import Link from "next/link";
import { ajustarSaldo } from "@/utils/saldo-conta-corrente";
import { deleteTransacao } from "@/utils/transacoes";

export default function Transacao(
  { transacao, onExclusao, podeExcluir }:
  { 
    transacao: ITransacao, 
    onExclusao: () => void,
    podeExcluir?: boolean
  }) {

  async function excluirTransacao() {
    if (!transacao || !transacao.id) {
      alert("Transação inválida ou não encontrada.");
      return;
    }

    let ajustousaldo: boolean = false;

    if (!confirm("Tem certeza que deseja excluir esta transação?")) {
      return;
    }

    ajustousaldo = await ajustarSaldo(transacao, 'inversa');

    if (!ajustousaldo) {
      alert("Erro ao ajustar o saldo, tente novamente.");
      return;
    }

    const deletouTransacao: boolean = await deleteTransacao(transacao.id);

    if (!deletouTransacao) {
      await ajustarSaldo(transacao, 'normal');
      alert("Erro ao excluir transação, tente novamente.");
      return;
    }

    onExclusao();
  }

  return (
    <li>
      <div className="flex flex-col gap-(--m) sm:flex-row sm:justify-between sm:items-center sm:gap-(--gg) border-b-(--texto-fundo-claro) border-b-[1px] pb-(--p) mb-(--p)">
        <div className="flex w-full flex-row justify-between items-center">
          <div className="flex flex-col w-max">
            <p className="text-[length:var(--texto-m)]">{transacao.descricao}</p>
            <p className="text-[length:var(--texto-p)]">{transacao.tipo}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className={
              `text-[length:var(--texto-m)] 
              ${
                transacao.tipo === 'Receita' ?
                'text-(--sucesso)' :
                'text-(--erro)'
              }`}
            >{transacao.tipo === 'Receita' ? '+' : '-'}R$ {Number(transacao.valor).toFixed(2)}</p>
            <p className="text-[length:var(--texto-p)]">{formatDate(transacao.data)}</p>
          </div>
        </div>
        <div className="flex justify-end sm:justify-between items-center gap-(--p)">
          <Link
            href={`/transacao/${transacao.id}`}
          >
            <button className="botao-primario">Editar</button>
          </Link>
          {
            podeExcluir ? 
              <button onClick={excluirTransacao} className="botao-exclusao">Excluir</button> :
              ''
          }
        </div>
      </div>
    </li>
  )
}