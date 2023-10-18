import Image from "next/image";
import Link from "next/link";
import Footer from "./Footer";
import Header from "./Header";
import SquigglyLines from "./SquigglyLines";
import {useSession} from "next-auth/react";

export default function HomePage() {

  return (
    <div className="bg-[#060A23] text-white flex m-0 w-full flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center background-gradient">
        <img src="/img/index/01.png" className="w-full object-contain" />
        <img src="/img/index/03.png" className="w-full object-contain" />
        <img src="/img/index/04.png" className="w-full object-contain" />
        <img src="/img/index/05.png" className="w-full object-contain" />
        <img src="/img/index/06.png" className="w-full object-contain" />
      </main>
      <Footer />
    </div>
  );
}
