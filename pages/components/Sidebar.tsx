import { CiHome } from "react-icons/ci"
import { MdOutlinePayments } from "react-icons/md"
import { FaChartBar } from "react-icons/fa"
import { AiOutlineAppstoreAdd } from "react-icons/ai"
import { BiUser } from "react-icons/bi"
import { VscArrowSwap } from "react-icons/vsc"
import { MdOutlineSmartButton, MdOutlineFeed } from "react-icons/md"
import { FiLayout } from "react-icons/fi"
import TabCard from "./SidebarComponents/TabCard"

const Sidebar = () => {
  return (
    <aside className="w-1/5 fixed left-0 top-20 ml-10 px-10 items-center bottom-0 overflow-y-scroll">
      <TabCard name="Home" active IconName={CiHome} />
      <TabCard name="My Page" IconName={FiLayout} />
      <h3 className="font-light text-xs my-3 text-neutral-400">STORE</h3>
      <TabCard name="Products" IconName={MdOutlineFeed} />
      <TabCard name="Payments" IconName={MdOutlinePayments} />
      <h3 className="font-light text-sm my-3 text-neutral-400">PUBLISH</h3>
      <TabCard name="Reports" IconName={FaChartBar} />
      <TabCard name="Transactions" IconName={VscArrowSwap} />
      <h3 className="font-light text-xs my-3 text-neutral-400">SETTINGS</h3>
      <TabCard name="Integrations" IconName={AiOutlineAppstoreAdd} />
      <TabCard name="Pay Buttons" IconName={MdOutlineSmartButton} />
      <TabCard name="Account" IconName={BiUser} />
    </aside>
  )
}

export default Sidebar
