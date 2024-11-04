import { Button, Center, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';




function Jarayondagilar() {



  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)




  //searchstate
  const [searchName, setSearchName] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isloading, setIsLoading] = useState(false)


  //cardName search
  const handleSearchN = () => {
    const fetcheuoMG = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }
      setIsLoading(true)
      try {
        const response = await fetch(`https://ventum-internship-backend.bis-apps.com/api/supplier-purchase-orders/by-card-name-and-status/${searchName}/3/pagination/0`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        const data = await response.json();
        setSearchData(data?.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetcheuoMG();
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
        const response = await fetch('https://ventum-internship-backend.bis-apps.com/api/supplier-purchase-orders/by-status/3/pagination/0', {
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
        setLoading(false)
      }
    };

    fetchData();
  }, [])





  
  return (
    <div>

      <div>
        <div className='children_black'>
          <Input value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder='cardNameni qidiring' />
          <Button onClick={handleSearchN} colorScheme='teal' size='md'>Qidirish</Button>
        </div>
        <div>
          {isloading ? (
            <Center mt="4">
              <Spinner size="xl" />
            </Center>
          ) : error ? (<Text>{error.message}</Text>) : (
            <TableContainer mt="4" maxWidth={"980"}>
              <Table variant="striped" colorScheme="teal">
                {searchData.length > 0 && <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>docEntry</Th>
                    <Th>docNum</Th>
                    <Th>cardName</Th>
                    <Th>docDate</Th>
                    <Th>docTotal</Th>
                    <Th>docDueDate</Th>
                    <Th>documentLines</Th>
                  </Tr>
                </Thead>}
                <Tbody>
                  {searchData.map((item, index) => (
                    <Tr >
                      <Td>{index + 1}</Td>
                      <Td>{item.docEntry}</Td>
                      <Td>{item.docNum}</Td>
                      <Td>{item.cardName}</Td>
                      <Td>{format(new Date(item.docDate), 'dd.MM.yyyy')}</Td>
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


      </div>


      <div>
        <Text mt="4" color='blue' fontSize={"xl"}>Jarayondagilar</Text>

        <div>
          {loading ? (
            <Center mt="4">
              <Spinner size="xl" />
            </Center>
          ) : error ? (<Text>{error.message}</Text>) : (
            <TableContainer mt="4" maxWidth={"980"}>
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>docEntry</Th>
                    <Th>docNum</Th>
                    <Th>cardName</Th>
                    <Th>docDate</Th>
                    <Th>docTotal</Th>
                    <Th>docDueDate</Th>
                    <Th>documentLines</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((item, index) => (
                    <Tr >
                      <Td>{index + 1}</Td>
                      <Td>{item.docEntry}</Td>
                      <Td>{item.docNum}</Td>
                      <Td>{item.cardName}</Td>
                      <Td>{format(new Date(item.docDate), 'dd.MM.yyyy')}</Td>
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
      </div>
   
    </div>
  )
}

export default Jarayondagilar