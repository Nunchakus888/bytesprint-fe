import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

interface IColumn {
  title: string;
  dataIndex: string;
  key: string;
  render?: (list: any, { content }: { content: string }) => void;
}

export default function BYTable(props: { columns: any[]; dataSource: any[] }) {
  const { columns, dataSource } = props;
  return (
    <TableContainer display="flex" justifyContent="space-between" overflow="visible" width="100%">
      <Table variant="simple">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            {columns?.map((it, index) => {
              const { width, textAlign } = it;
              return (
                <Th
                  key={`${it.key}_${Date.now()}`}
                  width={width}
                  textAlign={textAlign}
                  padding="10px"
                >
                  {it.title}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {dataSource?.map((data, index) => {
            return (
              <Tr key={`line_${index}`}>
                {columns?.map((c, ci) => {
                  const isRender = c.render;
                  const key = c.dataIndex;
                  const value = data[key];
                  return (
                    <>
                      {isRender ? (
                        <Td
                          key={`${value || Date.now()}_${index}_${ci}`}
                          borderBottom="none"
                          padding="10px"
                        >
                          {c.render(dataSource, data, index)}
                        </Td>
                      ) : (
                        <Td
                          key={`${value || Date.now()}_${index}_${ci}`}
                          borderBottom="none"
                          padding="10px"
                        >
                          {value}
                        </Td>
                      )}
                    </>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
