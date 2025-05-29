import { ITransacao } from "@/interfaces/itransacao";

export async function getTransacao(id: string): Promise<ITransacao | undefined> {
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

export async function getTransacoes(quantidade?: number): Promise<ITransacao[]> {
  try {
    const res = await fetch('http://127.0.0.1:3001/transacoes?_sort=-data' + (quantidade ? `&_limit=${quantidade}` : ''));
    return res.json()
  } catch (error) {
    return [];
  }
}

export async function updateTransacao(id: string, transacao: ITransacao): Promise<boolean> {
  try {
    const res = await fetch('http://127.0.0.1:3001/transacoes/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transacao),
    });
    if (!res.ok) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

export async function createTransacao(transacao: ITransacao): Promise<boolean> {
  try {
    const res = await fetch('http://127.0.0.1:3001/transacoes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transacao),
    });
    if (!res.ok) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteTransacao(id: string): Promise<boolean> {
  try {
    const res = await fetch('http://127.0.0.1:3001/transacoes/' + id, {
      method: 'DELETE'
    });
    if (res.ok) {
      return true
    }
    else {
      alert("Erro ao excluir transação, tente novamente.");
      return false;
    }
  }
  catch (error) {
    console.log("Erro ao excluir transação: " + error);
    return false;
  }
}