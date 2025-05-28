import { ISaldoConta } from "@/interfaces/isaldo-conta";

export async function getSaldo(): Promise<ISaldoConta | undefined>  {
  try {
    const res = await fetch('http://127.0.0.1:3001/conta-corrente/1');
    return res.json()
  } catch (error) {
    console.log("Erro ao buscar saldo da conta: ", error);
  }  
}

export async function ajustarSaldo(valor: number, tipo: 'aumentar' | 'diminuir'): Promise<boolean> {
    const saldo = await getSaldo();
    
    if (!saldo) {
        alert("Saldo da conta corrente não encontrado. Tente novamente mais tarde");
        return false;
    }

    tipo === 'aumentar' ? 
      saldo.total += valor : 
      saldo.total -= valor;

    try {
        const res = await fetch('http://127.0.0.1:3001/conta-corrente/1', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(saldo),
        });
        if (res.ok) {
            console.log('Saldo Ajustado com sucesso!');
            return true;
        }
        if (!res.ok) {
            console.log("Erro ao ajustar saldo, tente novamente.");
            return false;
        }
    } catch (error) {
        console.log("Erro ao ajustar o saldo: " + error);
        return false;
    }  
    return false;
}