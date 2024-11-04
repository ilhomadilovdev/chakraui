import { Center, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

function Jarayondanotdi_yetkazibberuvchi() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }
      setLoading(true)
      try {
        const response = await fetch('https://ventum-internship-backend.bis-apps.com/api/courier-purchase-order/under-review/pagination/0?status=6', {
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
    <Text mt="4" color='blue' fontSize={"xl"}>Jarayondan o'tdi |Прошел проверку</Text>

    <div>
      {loading ? (
        <Center mt="4">
          <Spinner size="xl" />
        </Center>
      ) : error ? (<Text color="red">{error.message}</Text>) : (
        <TableContainer maxWidth={"980"}>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>docNum</Th>
                <Th>cardCode</Th>
                <Th>cardName</Th>
                <Th>docDate</Th>
                <Th>docDueDate</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, index) => (
                <Tr >
                  <Td>{index + 1}</Td>
                  <Td>{item.docNum}</Td>
                  <Td>{item.cardCode}</Td>
                  <Td>{item.cardName}</Td>
                  <Td>{item.docDate}</Td>
                  <Td>{item.docDueDate}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

      )}
    </div>
  </div>
  )
}

export default Jarayondanotdi_yetkazibberuvchi