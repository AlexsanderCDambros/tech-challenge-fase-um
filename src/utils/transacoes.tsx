import { ITransacao } from "@/interfaces/itransacao";

export async function getTransacao(id: number): Promise<ITransacao | undefined> {
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