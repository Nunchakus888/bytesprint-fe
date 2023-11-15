import Footer from "./Footer";
import Header from "./Header";
import { Carousel } from 'flowbite-react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Box, Show, Hide } from '@chakra-ui/react'
import { useTranslation } from "next-i18next";
import {useEffect, useState} from "react";

import Card from './components/Card';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

export default function HomePage() {
  const { t, i18n } = useTranslation("home");
  const [file, setFile] = useState(`/pdf/${i18n?.language || 'en'}-whitePaper.pdf`);

  const homeTrans = i18n.store.data[i18n.language]['home'] || {};
  // console.log('----homeTrans', homeTrans);

  useEffect(() => {
    setFile(`/pdf/${i18n.language}-whitePaper.pdf`);
  }, [i18n?.language]);


  const {
    banners,
    our_platform_advantages:
    advantages,
    is_this_the_current_you,
    byteSprint_changes_the_way_you_work,
    user_role_guidelines,
  } = homeTrans.home || {};

  return (
    <div className="bg-[#0C0B35] text-white flex m-0 w-full flex-col items-center py-2 min-h-screen">
      <Tabs
        variant="unstyled"
        className="w-full flex-1"
        onChange={(index) => {
          if (index === 1) {
            setFile(`/pdf/${i18n.language}-whitePaper.pdf`);
          }
        }}
      >
        <Header className="sticky top-0 left-0 z-10 bg-[#060A23] px-4 md:px-20">
          <Box position="relative" pb={4}>
            <TabList>
              {
                Object.keys(homeTrans).map((i) => (<Tab key={i}>{t('home.tabs.' + i)}</Tab>))
              }
            </TabList>

            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="blue.500"
              borderRadius="1px"
            />
          </Box>
        </Header>

        <TabPanels className="">
          <TabPanel className="!p-0" key={'home'}>
            <main className="flex w-full flex-col items-center justify-center text-center background-gradient">
              {
                banners && (
                  <Carousel indicators={!0} pauseOnHover>
                    {
                      banners.map((item) => <Card {...item} />)
                    }
                  </Carousel>
                )
              }

              {
                advantages && (
                  <div className="flex flex-col items-center justify-center text-center px-4 md:px-20">
                    <h1 className="text-2xl md:text-4xl font-bold text-white mt-10 mb-10">{advantages.title}</h1>
                    <div className="flex flex-row flex-wrap justify-center items-center gap-10">
                      {
                        advantages.data.map((item) => (
                          <div className="flex flex-row grow justify-between items-center border p-4 md:p-10 md:basis-5/12">
                            <div className="text-left flex flex-col gap-4">
                              <h2 className="text-xl font-bold text-white">{item.H1}</h2>
                              <p className="text-base text-gray-300">{item.H2}</p>
                            </div>
                            <img src={item.bg} className="w-20 h-20 object-contain flex-1/2 flex-shrink-0" />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
              }

              {
                is_this_the_current_you && (
                  <div className="flex flex-col items-center justify-center text-center">
                    <Hide above="md">
                      <h1 className="text-2xl md:text-4xl font-bold text-white mt-10 mb-8">{is_this_the_current_you.title}</h1>
                    </Hide>
                    <div className="relative">
                      <img src={is_this_the_current_you.bg} className="w-full object-contain" />
                      <div className="absolute top-1/2 -translate-y-2/4	 left-0 flex flex-col items-start gap-2 md:gap-5 px-8 md:px-20">
                        <Show above="md">
                          <h1 className="text-2xl md:text-4xl font-bold text-white mb-10">{is_this_the_current_you.title}</h1>
                        </Show>
                        {
                          is_this_the_current_you.data.map((item) => <p className="text-sm md:text-xl font-bold text-white">{item}</p>)
                        }
                      </div>
                    </div>
                  </div>
                )
              }

              {
                byteSprint_changes_the_way_you_work && (
                  <div className="flex flex-col items-center md:items-start justify-center text-center px-4 md:px-20">
                    <h1 className="text-2xl md:text-4xl font-bold text-white mt-5 mb-10">{byteSprint_changes_the_way_you_work.title}</h1>
                    <div className="flex flex-row flex-wrap justify-center items-baseline gap-10 rounded-2xl bg-[#46466b] bg-opacity-50 p-4 md:p-8">
                      {
                        byteSprint_changes_the_way_you_work.data.map((item) => (
                          <div className="flex flex-row justify-between items-baseline p-4 grow md:basis-1/5 md:h-48">
                            {/*<img src={item.bg} className="w-20 h-20 object-contain flex-1/2 flex-shrink-0" />*/}
                            <div className="text-left flex flex-col gap-4">
                              <h2 className="text-xl font-bold text-white">{item.H1}</h2>
                              <p className="text-base text-gray-300">{item.H2}</p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
              }

              {
                user_role_guidelines && (
                  <div className="w-full flex flex-col justify-center text-center px-4 md:px-20">
                    <h1 className="text-2xl md:text-4xl font-bold text-white my-10">{user_role_guidelines.title}</h1>
                    <div className="flex flex-row flex-wrap justify-between items-baseline gap-4">
                      {
                        user_role_guidelines.data.map((item) => (
                          <div className="grow md:basis-1/4 border bg-[#666675] p-4 md:p-8 rounded-lg flex flex-col gap-4 md:h-72">
                            <h2 className="text-xl font-bold text-white">{item.title}</h2>
                            <div className="flex flex-col items-start gap-2 grow">
                              {
                                item.data.map(i => <h2 className="text-base text-gray-300 text-left">{i}</h2>)
                              }
                            </div>
                            {/*<p className="text-base text-gray-300 text-left">{item.button}</p>*/}
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
              }

            </main>
          </TabPanel>

          <TabPanel className="!p-0" key={'white-paper'}>
            <main className="flex w-full h-[100vh] flex-col items-center justify-center text-center background-gradient">
              {/*<Document file={file} onLoadSuccess={onDocumentLoadSuccess}  options={options}>
                <Page pageNumber={pageNumber} />
              </Document>*/}
              <iframe src={file} className="h-full w-full" />
            </main>
          </TabPanel>

          <TabPanel className="!p-0" key={'captain'}>
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