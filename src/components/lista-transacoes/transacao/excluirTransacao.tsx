'use client';

import { ITransacao } from "@/interfaces/itransacao";
import { ajustarSaldo } from "@/utils/saldo-conta-corrente";
import { useRouter } from "next/navigation";

export default function ExcluirTransacao({transacao}: {transacao: ITransacao}) {
    const router = useRouter();

    async function excluirTransacao() {
        let ajustousaldo: boolean = false;

        if (!confirm("Tem certeza que deseja excluir esta transação?")) {
            return;
        }
        
        ajustousaldo = await ajustarSaldo(transacao, 'inversa');
        
        if (!ajustousaldo) {
            alert("Erro ao ajustar o saldo, tente novamente.");
            return;
        }

        try {
            const res = await fetch('http://127.0.0.1:3001/transacoes/' + transacao.id, {
                method: 'DELETE'
            });
            if (res.ok) {
                router.refresh();
            }
            if (!res.ok) {
                router.refresh();
                await ajustarSaldo(transacao, 'normal');
                alert("Erro ao excluir transação, tente novamente.");
            }
        }
        catch (error) {
            router.refresh();
            console.log("Erro ao excluir transação: " + error);
            await ajustarSaldo(transacao, 'normal');
        }
    }

    return (
        <>
            <button onClick={excluirTransacao} className="botao-exclusao">Excluir</button>
        </>
    ) 
}