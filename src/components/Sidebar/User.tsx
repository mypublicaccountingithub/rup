import { useEffect } from "react";
import { useRouter } from "next/router";

import Cookies from "universal-cookie";

//  icons
import { FiLogOut, FiUser } from "react-icons/fi";
//  hooks
import useUser from "@/hooks/user";

function User() {
  //  variables
  const cookie = new Cookies();
  const router = useRouter();

  //  hooks
  const user = useUser();

  //  side effects
  useEffect(() => {
    console.log("useEffect ; ", user);
  }, [user]);

  //  handlers
  const handleLogout = async () => {
    cookie.set("token", null, { expires: new Date(), maxAge: 0 });
    router.push("/login");
  };

  return (
    <div>
      <div className="flex flex-col items-center text-main-purple cursor-pointer hover:text-light-purple2 transition-all duration-300">
        <FiUser className="text-2xl" />
        <span className="text-[13px] font-bold">
          {user?.data?.data[0].nemDesc}
        </span>
      </div>

      <div
        onClick={handleLogout}
        className="flex flex-col items-center text-main-purple cursor-pointer hover:text-light-purple2 transition-all duration-300 mt-8"
      >
        <FiLogOut className="text-2xl" />
        <span className="text-[13px] font-bold">logout</span>
      </div>
    </div>
  );
}

export default User;
