'use client';

import { ITransacao } from "@/interfaces/itransacao";
import { correcaoSaldo } from "@/utils/saldo-conta-corrente";
import { useRouter } from "next/navigation";

export default function ExcluirTransacao({transacao}: {transacao: ITransacao}) {
    const router = useRouter();

    async function excluirTransacao() {
        let ajustousaldo: boolean = false;

        if (!confirm("Tem certeza que deseja excluir esta transação?")) {
            return;
        }
        
        ajustousaldo = await correcaoSaldo(transacao, 'inversa');
        
        if (!ajustousaldo) {
            alert("Erro ao ajustar o saldo, tente novamente.");
            return;
        }

        try {
            const res = await fetch('http://127.0.0.1:3001/transacoes/' + transacao.id, {
                method: 'DELETE'
            });
            if (res.ok) {
                alert("Transação excluída com sucesso!");
                router.refresh();
            }
            if (!res.ok) {
                router.refresh();
                await correcaoSaldo(transacao, 'normal');
                alert("Erro ao excluir transação, tente novamente.");
            }
        }
        catch (error) {
            console.log("Erro ao excluir transação: " + error);
            await correcaoSaldo(transacao, 'normal');
        }
    }

    return (
        <>
            <button onClick={excluirTransacao} className="botao-exclusao">Excluir</button>
        </>
    ) 
}