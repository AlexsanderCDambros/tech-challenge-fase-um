import Transacao from "./transacao/transacao";

export default function ListaTransacoes({quantidade}: {quantidade: number}) {
  return (
    <div>
        Lista Transações
        <Transacao></Transacao>
        <Transacao></Transacao>
    </div>
  )
}