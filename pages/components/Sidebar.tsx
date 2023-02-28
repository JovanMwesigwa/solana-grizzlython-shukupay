import { CiHome } from "react-icons/ci"
import { MdOutlinePayments } from "react-icons/md"
import { FaChartBar } from "react-icons/fa"
import { AiOutlineAppstoreAdd } from "react-icons/ai"
import { BiUser } from "react-icons/bi"
import { VscArrowSwap } from "react-icons/vsc"
import { MdOutlineSmartButton, MdOutlineFeed } from "react-icons/md"
import { FiLayout } from "react-icons/fi"
import TabCard from "./SidebarComponents/TabCard"

type Props = {
  store?: any
}

const Sidebar = ({ store }: Props) => {
  return (
    <aside className="fixed bottom-0 left-0 items-center w-1/5 px-10 ml-10 overflow-y-scroll top-20">
      <TabCard name="Home" route="/dashboard" active IconName={CiHome} />
      <TabCard name="My Page" IconName={FiLayout} route={store?.slug} />
      <h3 className="my-3 text-xs font-light text-neutral-400">STORE</h3>
      <TabCard name="Products" route="/products" IconName={MdOutlineFeed} />
      <TabCard name="Payments" IconName={MdOutlinePayments} />
      <h3 className="my-3 text-sm font-light text-neutral-400">PUBLISH</h3>
      <TabCard name="Reports" IconName={FaChartBar} />
      <TabCard name="Transactions" IconName={VscArrowSwap} />
      <h3 className="my-3 text-xs font-light text-neutral-400">SETTINGS</h3>
      <TabCard name="Integrations" IconName={AiOutlineAppstoreAdd} />
      <TabCard name="Pay Buttons" IconName={MdOutlineSmartButton} />
      <TabCard name="Account" IconName={BiUser} />
    </aside>
  )
}

export default Sidebar
