'use client';
import { ITransacao } from "@/interfaces/itransacao";
import { correcaoSaldo } from "@/utils/saldo-conta-corrente";
import { createTransacao, updateTransacao } from "@/utils/transacoes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormTransacoes({ transacao }: { transacao: ITransacao | undefined }) {
    const router = useRouter();

    const cancelar = () => {
      router.back();
    };
    
    const [formData, setFormData] = useState({
      tipo: transacao?.tipo || 'Receita',
      metodo: transacao?.metodo || 'Dinheiro',
      descricao: transacao?.descricao || '',
      valor: transacao?.valor.toFixed(2) || 0.00,
      data: transacao?.data || new Date().toISOString().split('T')[0]
    } as ITransacao);

    const handleChange = (e:any) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        let ajustouSaldo: boolean = false;
        let criouEditouTransacao: boolean = false;
        
        if (!ajustouSaldo) {
            alert("Erro ao ajustar o saldo, tente novamente.");
            return;
        }

        if(!transacao || !transacao.id) {
            criouEditouTransacao = await createTransacao(formData);
        }
        else {
            ajustouSaldo = await correcaoSaldo(transacao, 'inversa');
            criouEditouTransacao = await updateTransacao(transacao.id, formData);
        }

        if (!criouEditouTransacao) {
            if(transacao && transacao.id) await correcaoSaldo(transacao, 'normal');
            alert("Erro ao criar ou editar a transação, tente novamente.");
            return;
        }

        await correcaoSaldo(formData, 'normal');
        alert("Transação salva com sucesso!");
        router.back();
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex items-center justify-center py-(--m)">
            <div className="max-w-[500px] flex flex-col gap-(--gg) w-full">
                <div className="flex flex-col gap-(--m)">
                    <div className="flex flex-col gap-(--p)">
                        <label className="text-[length:var(--texto-p)]" htmlFor="tipo">Tipo</label>
                        <select 
                            className="input-select"
                            name="tipo" 
                            id="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                            required
                        >
                            <option value="Receita">Receita</option>
                            <option value="Despesa">Despesa</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-(--p)">
                        <label className="text-[length:var(--texto-p)]" htmlFor="metodo">Método</label>
                        <select 
                            className="input-select"
                            name="metodo" 
                            id="metodo"
                            value={formData.metodo}
                            onChange={handleChange}
                            required
                        >
                            <option value="Dinheiro">Dinheiro</option>
                            <option value="Transferência">Transferência</option>
                            <option value="Depósito">Depósito</option>
                            <option value="Cartão de crédito">Cartão de crédito</option>
                            <option value="Cartão de débito">Cartão de débito</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-(--p)">
                        <label className="text-[length:var(--texto-p)]" htmlFor="descricao">Descrição</label>
                        <input 
                            className="input-text"
                            type="text" 
                            name="descricao"
                            id="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-(--p)">
                        <label className="text-[length:var(--texto-p)]" htmlFor="valor">Valor R$</label>
                        <input 
                            className="input-number"
                            type="number" 
                            name="valor"
                            id="valor"
                            value={formData.valor}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-(--p)">
                        <label className="text-[length:var(--texto-p)]" htmlFor="data">Data</label>
                        <input 
                            className="input-data"
                            type="date" 
                            name="data" 
                            id="data" 
                            value={formData.data}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center gap-(--m)">
                    <button type="button" onClick={cancelar} className="botao-secundario">Cancelar</button>
                    <button type="submit" className="botao-primario">Salvar</button>
                </div>
            </div>
        </form>
    );
}