import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";




function Home(){
  //  variables
  const router = useRouter();


  useLayoutEffect(()=>{
    router.push("/login")
  }, [])

  return null
}


export default Home;