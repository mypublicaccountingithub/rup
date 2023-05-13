
//  styles
import sideStyle from '../../styles/components/sidebar/sidebar.module.scss'
//  icons
import { FiUserCheck } from 'react-icons/fi';


function User(){
    return(
        <FiUserCheck className={sideStyle.user} />
    )
}

export default User;