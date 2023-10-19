import Image from "next/image";
import Link from "next/link";
import Footer from "./Footer";
import Header from "./Header";
import SquigglyLines from "./SquigglyLines";
import {useSession} from "next-auth/react";
import { Carousel } from 'flowbite-react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'

export default function HomePage() {

  return (
    <div className="bg-[#060A23] text-white flex m-0 w-full flex-col items-center py-2 min-h-screen">
      <Tabs position="relative">
        <Header className="sticky top-0 z-10 bg-[#060A23]">
          <TabList>
            <Tab className="outline-none">Home</Tab>
            {/*<Tab className="outline-none">White Paper</Tab>*/}
            <Tab className="outline-none">Captain</Tab>
          </TabList>
          {/*<TabIndicator
            mt="40px"
            height="2px"
            bg="blue.500"
            borderRadius="1px"
          />*/}
        </Header>
        <TabPanels>
          <TabPanel className="!p-0">
            <main className="flex w-full flex-col items-center justify-center text-center background-gradient">
              <Carousel indicators={false}>
                {/*<img alt="banner" src="/img/index/01.png" className="w-full h-full object-contain relative" />*/}
                <img alt="banner" src="/img/index/01-1.png" className="w-full object-contain relative" />
                <img alt="banner" src="/img/index/01-2.png" className="w-full object-contain relative" />
                <img alt="banner" src="/img/index/01-3.png" className="w-full object-contain relative" />
              </Carousel>

              <img src="/img/index/03.png" className="w-full object-contain" />
              <img src="/img/index/04.png" className="w-full object-contain" />
              <img src="/img/index/05.png" className="w-full object-contain" />
              <img src="/img/index/06.png" className="w-full object-contain" />
            </main>
          </TabPanel>

          <TabPanel className="!p-0">
            <main className="flex w-full flex-col items-center justify-center text-center background-gradient">
              <img src="/img/index/operator/01.png" className="w-full object-contain" />
              <img src="/img/index/operator/02.png" className="w-full object-contain" />
              <img src="/img/index/operator/03.png" className="w-full object-contain" />
              <img src="/img/index/operator/04.png" className="w-full object-contain" />
            </main>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Footer />
    </div>
  );
}
