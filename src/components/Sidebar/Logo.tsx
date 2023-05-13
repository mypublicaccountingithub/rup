

//  styles
import sideStyle from '../../styles/components/sidebar/sidebar.module.scss'
//  icosn
import { FiCodesandbox } from "react-icons/fi";



function Logo(){
    return(
        <div className={sideStyle.logo}>
            <FiCodesandbox className={sideStyle.logoSelf} />
        </div>
    )
}

export default Logo;