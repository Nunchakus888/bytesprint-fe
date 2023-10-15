import Image from "next/image";
import Link from "next/link";
import Footer from "./Footer";
import Header from "./Header";
import SquigglyLines from "./SquigglyLines";
import {useSession} from "next-auth/react";

export default function HomePage() {

  return (
    <div className="bg-[#0C0B36] text-white flex m-0 w-full flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
        <img src="/img/index/bg.png" className="w-full object-contain" />
      </main>
      <Footer />
    </div>
  );
}
