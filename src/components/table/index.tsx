import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

interface IColumn {
  title: string
  dataIndex: string
  key: string
  render?: (list:any , { content}: {content: string}) => void
}

export default function BYTable(props: {
  columns: any[],
  dataSource: any[]
}) {
  const {columns, dataSource} = props

  // const columns: ColumnsType<API_Article.Response.ListItem> = [
	// 	{
	// 		title: 'ID ',
	// 		dataIndex: 'article_id',
	// 		key: 'article_id',
	// 	},
	// 	{
	// 		title: 'Title ',
	// 		dataIndex: 'title',
	// 		key: 'title',
	// 	},
	// 	{
	// 		title: 'Content',
	// 		dataIndex: 'content',
	// 		key: 'content',
	// 		// render: (_, { content }) => {
	// 		// 	return <div dangerouslySetInnerHTML={{__html: content || ''}}></div>
	// 		// },
	// 	},
	// 	{
	// 		title: 'Flash Time',
	// 		dataIndex: 'article_date',
	// 		key: 'article_date',
	// 		render: (_, { article_date }) => {
	// 			const date = formatDate(new Date(Number(article_date)))
	// 			return <span>
	// 				<span style={{display: 'block', whiteSpace: 'nowrap'}}>{date[0]}</span>
	// 				<span style={{display: 'block', whiteSpace: 'nowrap'}}>{date[1]}</span>
	// 			</span>;
	// 		},
	// 	},
  return (
    <TableContainer>
      <Table variant='simple'>
    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
    <Thead>
      <Tr>
        {
          columns?.map((it, index) => {
            return <Th key={`${it.key}`} padding="10px">{it.title}</Th>
          })
        }
      </Tr>
    </Thead>
    <Tbody>
      {
        dataSource?.map((data, index) => {
          return (
            <Tr key={`${data.key}`}>
              {
                columns?.map((c, ci) => {
                  const isRender = c.render
                  const key = c.dataIndex
                  const value = data[key]
                  return (
                    <>
                      {
                        isRender ? <Td key={value} borderBottom="none" padding="10px">
                          {c.render(dataSource, data, index)}
                        </Td>:
                        <Td key={value} borderBottom="none" padding="10px">{value}</Td>
                      }
                    </>
                    
                  )
                })
              }
            </Tr>
          )
        })
      }
    </Tbody>
  </Table>
</TableContainer>
  )
}