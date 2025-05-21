import Cartao from "@/components/cartao/cartao";
import ListaTransacoes from "@/components/lista-transacoes/lista-transacoes";

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
          <p className="w-max">Saldo da conta corrente</p>
          <p className="text-[length:var(--texto-g)]">R$ 900,00</p>
        </Cartao>
      </div>
      <div className="flex flex-row justify-end">
        <p>botão</p>
      </div>
      <Cartao>
        <h2 className="text-[length:var(--texto-g)] pb-(--m)">Últimas transações</h2>
        <ListaTransacoes></ListaTransacoes>
      </Cartao>
    </div>
  );
}
