import { LayoutProps } from "@/interfaces"

const PlayerLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col border-2 w-full border-4 border-purple-500">
      Player Layout
      {children}
    </div>
  )
}

export default PlayerLayout