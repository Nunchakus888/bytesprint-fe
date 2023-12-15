import FileViewer from 'react-file-viewer'
export default function FileReviewer({
  file,
  type
}) {
  // TODO 修改成toast提示
  const onError = (e) => {
    console.log(e, 'error in file-viewer');
  }
  return (
    <FileViewer
      fileType={type}
      filePath={file}
      onError={onError}/>
  )
}