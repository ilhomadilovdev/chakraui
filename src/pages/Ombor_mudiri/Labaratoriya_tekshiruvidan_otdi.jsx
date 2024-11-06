import { Button, Center, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useModalControl } from "../../shared/lib/use-modal-control.js";
import { format } from 'date-fns';

function Labaratoriya_tekshiruvidan_otdi() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)


  const [searItem, setSearItem] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleItem = () => {
    const fetcheuoMG = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }
      setIsLoading(true)
      try {
        const response = await fetch(`https://ventum-internship-backend.bis-apps.com/api/warehouse-manager-purchase-orders/search/${searItem}/pagination/0`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        const data = await response.json();
        setSearchResults(data.data);
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
        const response = await fetch('https://ventum-internship-backend.bis-apps.com/api/warehouse-manager-purchase-orders/pagination/0', {
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


  const detailsModalControl = useModalControl()

  const handleClickDetails = (item) => {
    detailsModalControl.open({ item })
  }

  return (
    <div>
      <div>
        <Text color="gray" mt="2" fontSize="2xl">Qidirish</Text>

        <div>
          <Text mt="2" color="blue.400" fontWeight="500" fontSize="xl">ItemName boyicha qidirish:</Text>
          <div>
            <div className='flex_one'>
              <Input mt="2" maxW="250"
                value={searItem}
                onChange={(e) => setSearItem(e.target.value)}
                placeholder='cardNameni kiriting' />
              <Button
                onClick={handleItem}
                colorScheme='blue' size="md" p="2">Qidirish</Button>
            </div>

            {isLoading ? (<Spinner mt="3" size="md" />) : (
              <Table variant='simple'>
                {searchResults.length > 0 && <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>docNum</Th>
                    <Th>cardCode</Th>
                    <Th>cardName</Th>
                    <Th>docDate</Th>
                    <Th>docDueDate</Th>
                  </Tr>
                </Thead>}
                <Tbody>
                  {searchResults.map((item, index) => (
                    <Tr >
                      <Td>{index + 1}</Td>
                      <Td>{item.docNum}</Td>
                      <Td>{item.cardCode}</Td>
                      <Td>{item.cardName}</Td>
                      <Td>{format(new Date(item.docDate), 'dd.MM.yyyy')}</Td>
                      <Td>{format(new Date(item.docDueDate), 'dd.MM.yyyy')}</Td>
                      <Td>
                        <Button color={"white"} colorScheme='blue' onClick={() => handleClickDetails(item)}>
                          Details
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </div>
        </div>
      </div>


      <div>
        <Text mt="4" color='blue' fontSize={"xl"}>Tekshiruvdan o'tdi |  Прошел проверку </Text>

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
                      <Td>{format(new Date(item.docDate), 'dd.MM.yyyy')}</Td>
                      <Td>{format(new Date(item.docDueDate), 'dd.MM.yyyy')}</Td>
                      <Td>
                        <Button color={"white"} colorScheme='blue' onClick={() => handleClickDetails(item)}>
                          Details
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

          )}
        </div>

      </div>
      <Details modalControl={detailsModalControl} />
    </div>
  )
}

export default Labaratoriya_tekshiruvidan_otdi


export const Details = ({ modalControl }) => {
  const { state, close } = modalControl

  const { item } = state

  const getContent = () => {
    if (!state.visible) {
      return <></>
    }

    return (
      <div className='modal_flex'>

        <div>
          <h2>cardName:{item.cardName}</h2>
          <h2>docDate: {format(new Date(item.docDate), 'dd.MM.yyyy')}</h2>
          <h2>docDueDate: {format(new Date(item.docDueDate), 'dd.MM.yyyy')}</h2>
          <h2>docTotal:{item.docTotal}</h2>
          <h2>docCurrency:{item.docCurrency}</h2>
        </div>

        <div>
          <h2>itemCode:{item.documentLines[0].itemCode}</h2>
          <h2>itemDescription:{item.documentLines[0].itemDescription}</h2>
          <h2>quantity:{item.documentLines[0].quantity}</h2>
          <h2>measureUnit:{item.documentLines[0].measureUnit}</h2>

        </div>

      </div>
    )
  }
  return (
    <>
      <Modal isOpen={state.visible} onClose={close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Документ</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {getContent()}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={close}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
