import React, { useEffect, useState } from 'react'
import { Button, Center, Input, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';


function Tugallangan_xaridlar() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchName, setSearchName] = useState("")
  const [docData, setDocData] = useState([])
  const [loadingName, setLoadingName] = useState(false);

  const handleSearchName = () => {
    const fetchName = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }
      setLoadingName(true)
      try {
        const response = await fetch(`https://ventum-internship-backend.bis-apps.com/api/supplier-purchase-invoices/search-by-card-name/${searchName}/pagination/0`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        const data = await response.json();
        setDocData(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoadingName(false)
      }
    };

    fetchName();
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }
      setLoading(true)
      try {
        const response = await fetch('https://ventum-internship-backend.bis-apps.com/api/supplier-purchase-invoices/pagination/0', {
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

      <div>
        <Text mt="4" justifyContent="space-between" fontSize="2xl" fontFamily={"initial"} color="gray.800">Qidirish</Text>
        < div className='red'>
          <Input mt="2" value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder='cardNameni kiriting' />

          <Button colorScheme='red' p="2" fontSize="md" onClick={handleSearchName}>Qidirish</Button>
        </div>
        {loadingName ? (
          <Center mt="4">
            <Spinner size="xl" />
          </Center>
        ) : error ? (
          <Text color="red">{error}</Text>
        ) : (
          <TableContainer maxWidth="980">
            <Table variant="striped" colorScheme="teal">
              {docData.length > 0 && <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>docNum</Th>
                  <Th>cardName</Th>
                  <Th>cardCode</Th>
                  <Th>docDate</Th>
                  <Th>docTotal</Th>
                  <Th>docDueDate</Th>
                  <Th>Item Description</Th>
                </Tr>
              </Thead>}
              <Tbody>
                {docData.map((item, index) => (
                  <Tr >
                    <Td>{index + 1}</Td>
                    <Td>{item.docNum}</Td>
                    <Td>{item.cardName}</Td>
                    <Td>{item.cardCode}</Td>
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
      <Text mt="5" color="blue" fontSize="xl">
        Tugallangan xaridlar
      </Text>
      <div>
        {loading ? (
          <Center mt="4">
            <Spinner size="xl" />
          </Center>
        ) : error ? (
          <Text color="red">{error}</Text>
        ) : (
          <TableContainer maxWidth="980">
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>docNum</Th>
                  <Th>cardName</Th>
                  <Th>cardCode</Th>
                  <Th>docDate</Th>
                  <Th>docTotal</Th>
                  <Th>docDueDate</Th>
                  <Th>Item Description</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item, index) => (
                  <Tr >
                    <Td>{index + 1}</Td>
                    <Td>{item.docNum}</Td>
                    <Td>{item.cardName}</Td>
                    <Td>{item.cardCode}</Td>
                    <Td> {format(new Date(item.docDate), 'dd.MM.yyyy')}</Td>
                    <Td>{item.docTotal}</Td>
                    <Td> {format(new Date(item.docDueDate), 'dd.MM.yyyy')}</Td>
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

export default Tugallangan_xaridlar