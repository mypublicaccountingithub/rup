import Link from 'next/link';


//  styles
import sideStyle from '../../styles/components/sidebar/sidebar.module.scss'
//  icons
import { FiGrid } from "react-icons/fi"

function Items(){
    return(
        <div className={sideStyle.itemsContainer}>
            <div className={sideStyle.item}>
                <Link href="/projects" className={sideStyle.itemLink}>
                    <FiGrid className={sideStyle.logo} />
                    <span className={sideStyle.text}>projects</span>
                </Link>
            </div>
        </div>
    )
}

export default Items;