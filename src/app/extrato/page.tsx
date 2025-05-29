import Cartao from "@/components/cartao/cartao";
import ListaTransacoes from "@/components/lista-transacoes/lista-transacoes";
import Link from "next/link";

export default function Extrato() {
  return (
    <div className="flex flex-col gap-(--m)">  
      <div className="flex flex-col items-start gap-(--p) sm:flex-row sm:justify-between">
        <h1 className="text-[length:var(--texto-g)]">Lista de transações</h1>
        <Link
          href="/transacao"
        >
          <button className="botao-primario">
            Adicionar transação
          </button>
        </Link>
      </div>
      <Cartao>
        <ListaTransacoes podeEditar></ListaTransacoes>
      </Cartao>
    </div>
  );
}
