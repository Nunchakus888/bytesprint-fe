import Image from "next/image";
import Link from "next/link";
import Brand from "components/sidebar/components/Brand";
import {HorizonLogo} from "components/icons/Icons";
import {useColorModeValue} from "@chakra-ui/react";
import {useSession} from "next-auth/react";
import Logo from "components/image/Logo";
import MobileNav from "components/MobileNav";

export default function Header({ className = '', ...props }) {
  let logoColor = useColorModeValue('navy.700', 'white');
  const session = useSession();

  const name = session.data?.user?.name;

  return (
    <header className={`flex flex-row justify-between items-center w-full px-20 md:px-10 sm:px-4 gap-2 border-b border-gray-500 ${className}`}>

      <Logo className="my-6 sm:w-48 lg:w-64 flex-shrink-0" />

      <div className="sm:hidden md:block">
        {
          props.children
        }
      </div>

      <Link
        href={
          name ? '/admin' : '/login'
        }
        className="
        sm:hidden
        md:block
        truncate
        flex
        max-w-fit items-center justify-center space-x-2 rounded-full border border-blue-600 text-white px-5 py-2 text-sm shadow-md hover:bg-blue-500 bg-blue-600 font-medium transition"
      >
        {
          name ? '大厅' : '登录'
        }
      </Link>

      <MobileNav />

    </header>
  );
}