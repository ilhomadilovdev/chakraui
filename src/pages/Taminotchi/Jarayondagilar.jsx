import { Button, Center, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import { useModalControl } from "../../shared/lib/use-modal-control.js";



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



  const detailsModalControl = useModalControl()

  const handleClickDetails = (item) => {
    detailsModalControl.open({ item })
  }



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



      <JarayondagilarDetails modalControl={detailsModalControl} />

    </div>
  )
}

export default Jarayondagilar



export const JarayondagilarDetails = ({ modalControl }) => {
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
      <h2>price:{item.documentLines[0].unitPrice}</h2>
      <h2>branch:{item.branchId}</h2>
      
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
            <Button variantColor="blue" mr={3} onClick={close}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
