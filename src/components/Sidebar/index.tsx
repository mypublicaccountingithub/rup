

//  styles
import sideStyle from '../../styles/components/sidebar/sidebar.module.scss'
//  components
import Logo from "./Logo";
import Items from './Items';
import User from './User';


function Sidebar(){
    return(
        <div className={sideStyle.sidebarBody}>
            <Logo />
            <Items />
            <User />
        </div>
    )
}

export default Sidebar;