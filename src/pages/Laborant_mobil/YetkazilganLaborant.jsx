import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useModalControl } from "../../shared/lib/use-modal-control.js";
import { format } from 'date-fns';


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

  const detailsModalControl = useModalControl()

  const handleClickDetails = (item) => {
    detailsModalControl.open({ item })
  }




  return (
    <div>
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
              data?.map((item, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{item?.docNum}</Td>
                  <Td>{item?.cardName}</Td>
                  <Td>{format(new Date(item?.docDate), 'dd.MM.yyyy')}</Td>
                  <Td>{format(new Date(item?.docDueDate), 'dd.MM.yyyy')}</Td>
                  <Td>{item?.documentLines[0].itemDescription}</Td>
                  <Td>{item?.docTotal}</Td>
                  <Td>{item?.branchId}</Td>
                  <Td>
                    <Button color={"white"} colorScheme='blue' onClick={() => handleClickDetails(item)}>
                      Details
                    </Button>
                  </Td>

                </Tr>
              ))
            )}

          </Tbody>
        </Table>
      </div>

      <Details modalControl={detailsModalControl} />
    </div>
  )
}

export default YetkazilganLaborant


export const Details = ({ modalControl }) => {

  const toast = useToast()

  const [loading, setLoadingSearch] = useState(false);
  const [error, setError] = useState(null)


  const { state, close } = modalControl

  const { item } = state

  const getContent = () => {
    if (!state.visible) {
      return <></>
    }

    const handleButton = (params) => {
      const fetchButton = async (params) => {
          const token = localStorage.getItem('token');

          if (!token) {
              setError('Пользователь не авторизован');
              return;
          }

          setLoadingSearch(true);

          try {
              const response = await fetch(`https://ventum-internship-backend.bis-apps.com/api/laboratorian-purchase-orders/to-first-under-review-process/${item.docEntry}/docnum/${item.docNum}`, {
                  method: 'PATCH',
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                     params
                  }),
              });

              if (!response.ok) {
                  throw new Error('Ошибка при получении данных');
              }
        
              const data = await response.json();
              toast({
                  title: 'Успешно!',
                  description: 'Amal muvaffaqiyatli bajarildi .',
                  status: 'success',
                  isClosable: true,
              });

            

          } catch (error) {
              setError(error.message);
          } finally {
              setLoadingSearch(false);
          }
      };


      fetchButton()
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
          <h2>quantity:{item.documentLines[0].measureUnit}</h2>

        </div>
        <Button onClick={()=>handleButton(item)} mt="5" colorScheme='green' fontSize="lg" color="white">Начать</Button>
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
