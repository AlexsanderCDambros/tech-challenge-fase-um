'use client';

import { ITransacao } from "@/interfaces/itransacao";
import { ajustarSaldo } from "@/utils/saldo-conta-corrente";
import { deleteTransacao } from "@/utils/transacoes";
import { useRouter } from "next/navigation";

export default function ExcluirTransacao({transacao}: {transacao: ITransacao}) {
    const router = useRouter();

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

        router.refresh();
    }

    return (
        <>
            <button onClick={excluirTransacao} className="botao-exclusao">Excluir</button>
        </>
    ) 
}