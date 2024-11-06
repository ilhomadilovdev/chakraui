import { Center, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'



export default function Yetkazilgan() {


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }
      setLoading(true)
      try {
        const response = await fetch('https://ventum-internship-backend.bis-apps.com/api/courier-purchase-order/delivered/pagination/0', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        const data = await response.json();
        setData(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false)
      }
    };
    fetchData();

  }, [])
  return (
    <div>
      <Text fontSize="2xl" mt="8">Yetkazilganfff</Text>
      {loading ? (
        <Center mt="4">
          <Spinner size="xl" />
        </Center>
      ) : error ? (
        <Text color="red">{error.message}</Text>
      ) : (
        <TableContainer mt="1" maxWidth="980">
          <Table variant="striped" colorScheme="teal">
            {data.length > 0 && <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>docNum</Th>
                <Th>cardName</Th>
                <Th>docDate</Th>
                <Th>docTotal</Th>
                <Th>docDueDate</Th>
                <Th>Item Description</Th>
              </Tr>
            </Thead>}
            <Tbody>
              {data.map((item, index) => (
                <Tr >
                  <Td>{index + 1}</Td>
                  <Td>{item.docNum}</Td>
                  <Td>{item.cardName}</Td>
                  <Td> {format(new Date(item.docDate), 'dd.MM.yyyy')}</Td>
                  <Td>{item.docTotal}</Td>
                  <Td>{format(new Date(item.docDueDate), 'dd.MM.yyyy')}</Td>
                  <Td>{item.documentLines[0].itemDescription}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}
