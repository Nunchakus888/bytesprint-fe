import Image from "next/image";
import Link from "next/link";
import Brand from "../sidebar/components/Brand";
import {HorizonLogo} from "../icons/Icons";
import {useColorModeValue} from "@chakra-ui/react";
import {useSession} from "next-auth/react";

export default function Header() {
  let logoColor = useColorModeValue('navy.700', 'white');
  const session = useSession();

  const name = session.data?.user?.name;

  return (
    <header className="flex flex-col xs:flex-row justify-between items-center w-full border-b sm:px-4 px-20 border-gray-500 gap-2">

      <HorizonLogo h='50px' w='220px' my="18px" color={logoColor} />

      <Link
        href={
          name ? '/admin' : '/login'
        }
        className="truncate flex max-w-fit items-center justify-center space-x-2 rounded-full border border-blue-600 text-white px-5 py-2 text-sm shadow-md hover:bg-blue-500 bg-blue-600 font-medium transition"
      >
        {
          name || '登录'
        }
      </Link>
    </header>
  );
}