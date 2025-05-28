import Cartao from "@/components/cartao/cartao";
import ListaTransacoes from "@/components/lista-transacoes/lista-transacoes";
import SaldoConta from "@/components/saldo-conta/saldo-conta";
import Link from "next/link";

export default function Inicio() {

  return (
    <div className="flex flex-col gap-(--m)">  
      <h1 className="text-[length:var(--texto-g)]">Tela inicial</h1>
      <div className="flex flex-col sm:flex-row justify-between gap-(--p)">
        <Cartao classeAdicional="w-full">
          <p className="text-[length:var(--texto-g)]">Olá usuário</p>
          <p>Aproveite nossa plataforma e pegue as rédias da sua vida financeira de forma fácil e intuitiva</p>
        </Cartao>
        <Cartao classeAdicional="flex flex-col justify-center">
          <SaldoConta></SaldoConta>
        </Cartao>
      </div>
      <div className="flex flex-row justify-end gap-(--p)">
        <Link
          href="/transacao"
        >
          <button className="botao-primario">
            Adicionar transação
          </button>
        </Link>
      </div>
      <Cartao>
        <h2 className="text-[length:var(--texto-g)] pb-(--m)">Últimas transações</h2>
        <ListaTransacoes quantidade={5}></ListaTransacoes>
      </Cartao>
    </div>
  );
}
