import Footer from "./Footer";
import Header from "./Header";
import { Carousel } from 'flowbite-react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import { useTranslation, i18n } from "next-i18next";
import { pdfjs, Document, Page } from 'react-pdf';
import {useEffect, useState} from "react";

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

export default function HomePage() {
  const trans = useTranslation("common");
  const [file, setFile] = useState(`/pdf/${i18n.language}-whitePaper.pdf`);

  const homeData = i18n.store.data[i18n.language]?.common?.home;

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  useEffect(() => {
    setFile(`/pdf/${i18n.language}-whitePaper.pdf`);
  }, [i18n.language])
  return (
    <div className="bg-[#0C0B35] text-white flex m-0 w-full flex-col items-center py-2 min-h-screen">
      <Tabs position="relative" variant="unstyled" className="w-full flex-1">
        <Header className="sticky top-0 z-10 bg-[#060A23]">
          <TabList>
            {
              Object.keys(homeData.tabs).map((i) => (<Tab key={i}>{trans.t('home.tabs.' + i)}</Tab>))
            }
          </TabList>

          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="blue.500"
            borderRadius="1px"
          />
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
            <main className="flex w-full h-[100vh] flex-col items-center justify-center text-center background-gradient">
              {/*<Document file={file} onLoadSuccess={onDocumentLoadSuccess}  options={options}>
                <Page pageNumber={pageNumber} />
              </Document>*/}
              <iframe src={file} className="h-full w-full" />
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
