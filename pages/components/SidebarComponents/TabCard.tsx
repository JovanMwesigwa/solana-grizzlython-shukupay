import Link from "next/link"
import { CiHome } from "react-icons/ci"

type Props = {
  active?: boolean
  IconName: any
  name: String
  route?: String
}

const TabCard = ({ IconName, route, active, name }: Props) => {
  return (
    <Link href={route ? route : ""}>
      <div
        className={`w-full ${active && "bg-neutral-200"} my-2 ${
          !active && "hover:bg-neutral-100"
        } p-2 px-6 cursor-pointer flex flex-row items-center  rounded-full`}
      >
        <IconName size={18} />
        <h1 className="ml-3">{name}</h1>
      </div>
    </Link>
  )
}

export default TabCard
