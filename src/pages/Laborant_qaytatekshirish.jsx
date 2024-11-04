import React, { useEffect, useState } from 'react'
import { Center, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';

function Laborant_qaytatekshirish() {


  const [data, setData] = useState([]);
  const [loading, setIsloading] = useState(false);
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }

      try {
        const response = await fetch('https://ventum-internship-backend.bis-apps.com/api/laboratorian-purchase-orders/by-status/7/pagination/0', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        const data = await response.json();
        setData(data?.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsloading(false)
      }
    };

    fetchData();
  })
  return (
    <div>
      <Text mt="4" color='blue' fontSize={"xl"}>Qayta tekshiruv|Перепроверка</Text>

      <div>
        {loading ? (
          <Center mt="4">
            <Spinner size="xl" />
          </Center>
        ) : error ? (<Text>{error}</Text>) : (
          <TableContainer mt="4" maxWidth={"980"}>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>N</Th>
                  <Th>docNum</Th>
                  <Th>cardCode</Th>
                  <Th>cardName</Th>
                  <Th>docDate</Th>
                  <Th>docDueDate</Th>
                  <Th>timer</Th>
                  <Th>Description</Th>

                </Tr>
              </Thead>
              <Tbody>
                {data.map((item, index) => (
                  <Tr key={index} >
                    <Td>{index + 1}</Td>
                    <Td>{item.docNum}</Td>
                    <Td>{item.cardCode}</Td>
                    <Td>{item.cardName}</Td>
                    <Td> {format(new Date(item.docDate), 'dd.MM.yyyy')}</Td>
                    <Td> {format(new Date(item.docDueDate), 'dd.MM.yyyy')}</Td>
                    <Td>{item.timer1}</Td>
                    <Td>{item.documentLines[0].itemDescription}</Td>
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

export default Laborant_qaytatekshirish