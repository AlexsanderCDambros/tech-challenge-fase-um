export default function Cartao({ children }: { children: React.ReactNode }) {
  return (
    <div className="shadow-(--sombra-card) p-(--m) rounded-(--canto-card)">
        { children ? children : '' }
    </div>
  )
}