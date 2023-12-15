import { Box, Flex, Link } from "@chakra-ui/react"
import styles from './index.module.scss'
// import DocViewer,{ PDFRenderer, PNGRenderer,DocViewerRenderers }  from "react-doc-viewer";
import { useState } from "react"
// import FileViewer from 'react-file-viewer-extended'

export default function FileReview(props: {
  url: string
}) {
  const {url} = props
  const docs = [
    { uri: url }, // Remote file
  ];

  return (
    <>
      <div style={{ height: '100vh' }}>
      {/* <DocViewer documents={docs} pluginRenderers={DocViewerRenderers}/> */}
      {/* <FileViewer fileType="docx" filePath={'/docx测试.docx'} /> */}
      {/* <iframe src="https://view.officeapps.live.com/op/view.aspx?src=后面是文件的地址" width='100%' height='600'></iframe> */}
      {/* <iframe src={url} width='100%' height='600'></iframe> */}
      
    </div>
    </>
  )
}