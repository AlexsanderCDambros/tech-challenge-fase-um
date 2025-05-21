import { ItemCabecalho } from "@/interfaces/item-cabecalho";
import ItemCabecalhoComponent from "./item-cabecalho/item-cabecalho";

export default function Cabecalho({ lista }: { lista: ItemCabecalho[] } ) {

  return (
    <div className="w-screen h-(--h-cabecalho) px-(--g) bg-(--primaria) flex flex-row items-center justify-between">
        <nav className="h-full">
            <ul className="flex flex-row items-center h-full">
                { 
                    lista.map((item,index) => {
                        return (
                            <li key={index} className="list-none m-0 px-(--m) hover:bg-(--auxiliar-primaria) h-full flex flex-row items-center">
                                <ItemCabecalhoComponent item={item}/>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
        <p className="text-[length:var(--texto-xgg)] text-(--texto-fundo-escuro) hidden sm:block">Tech Challenge</p>
    </div>
  )
}