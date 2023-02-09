import { CiHome } from "react-icons/ci"

type Props = {
  active?: boolean
  IconName: any
  name: String
}

const TabCard = ({ IconName, active, name }: Props) => {
  return (
    <div
      className={`w-full ${active && "bg-neutral-200"} my-2 ${
        !active && "hover:bg-neutral-100"
      } p-2 px-6 cursor-pointer flex flex-row items-center  rounded-full`}
    >
      <IconName size={18} />
      <h1 className="ml-3">{name}</h1>
    </div>
  )
}

export default TabCard
