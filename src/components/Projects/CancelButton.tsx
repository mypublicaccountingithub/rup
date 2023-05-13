import Link from 'next/link';


//  types && interface 
interface CancelButtonTypes {
    href: string,
}

function CancelButton(props:CancelButtonTypes){
    return(
        <Link href={props.href} className="text-grah-500 no-underline ml-4 text-gray-500 hover:text-red-500 cursor-pointer">
            <span >Cancel</span>
        </Link>
    )
}


export default CancelButton;