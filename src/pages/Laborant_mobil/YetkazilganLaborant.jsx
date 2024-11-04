import { Spinner, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'

function YetkazilganLaborant() {

  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }
      setLoading(true)
      try {
        const response = await fetch(`https://ventum-internship-backend.bis-apps.com/api/laboratorian-purchase-orders/by-status/2/pagination/0`, {
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
        toast({
          title: 'Error',
          description: 'An error occurred while fetching data.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <Text mt="2" color="green.500" fontSize="xl">Yetkazilgan 'laborant'</Text>
      <Table mt="2" variant="striped">
        {data.length > 0 && <Thead>
          <Tr >
            <Th>Sr.</ Th>
            <Th>DocNum</Th>
            <Th>cardName</Th>
            <Th>docDate</Th>
            <Th>docDueDate</Th>
            <Th>itemDescription</Th>
            <Th>docTotal</Th>
            <Th>branch</Th>
          </Tr>
        </Thead>}

        <Tbody >
          {loading ? (
            <Spinner size="md" />
          ) : error ? (
            <Text>Error: {error.message}</Text>
          ) : (
            data?.map((el, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{el?.docNum}</Td>
                <Td>{el?.cardName}</Td>
                <Td>{format(new Date(el?.docDate), 'dd.MM.yyyy')}</Td>
                <Td>{format(new Date(el?.docDueDate), 'dd.MM.yyyy')}</Td>
                <Td>{el?.documentLines[0].itemDescription}</Td>
                <Td>{el?.docTotal}</Td>
                <Td>{el?.branchId}</Td>

              </Tr>
            ))
          )}

        </Tbody>
      </Table>
    </div>
  )
}

export default YetkazilganLaborant