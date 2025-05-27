import Cartao from "@/components/cartao/cartao";
import FormTransacoes from "@/components/form-transacoes/form-transacoes";
import { ITransacao } from "@/interfaces/itransacao";

async function getTransacao(id: number): Promise<ITransacao | undefined> {
  try {
    const res = await fetch('http://127.0.0.1:3001/transacoes/' + id);
    if (!res.ok) {
        return undefined; 
    }
    return res.json()
  } catch (error) {
    return undefined; 
  }  
}

export default async function Transacoes({ params }: { params: { id?: string[] } }) {
    const { id: idArray } = await params;
    const id = idArray?.[0];
    let transacao: ITransacao | undefined = undefined;

    if (id) {
        transacao = await getTransacao(Number(id));
    }

    return (
      <div className="flex flex-col gap-(--m)">  
          <h1 className="text-[length:var(--texto-g)]">{ !id || !transacao ? 'Criar nova transação' : 'Editar transação'}</h1>
          <Cartao classeAdicional="w-full">
            <FormTransacoes transacao={transacao} />
          </Cartao>
      </div>
    );
}