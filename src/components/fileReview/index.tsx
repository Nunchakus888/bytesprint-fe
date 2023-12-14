import { Box, Flex, Link } from "@chakra-ui/react"
import styles from './index.module.scss'
import DocViewer,{ PDFRenderer, PNGRenderer,DocViewerRenderers }  from "react-doc-viewer";
import { useState } from "react"

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
      <DocViewer documents={docs} pluginRenderers={DocViewerRenderers}/>
    </div>
    </>
  )
}