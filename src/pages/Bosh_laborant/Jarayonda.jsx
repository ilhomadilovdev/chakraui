import { Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useModalControl } from "../../shared/lib/use-modal-control.js";
import { format } from 'date-fns';




function Jarayonda() {

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
                const response = await fetch('https://ventum-internship-backend.bis-apps.com/api/main-laboratorian-purchase-orders/by-status/3/pagination/0', {
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
            <Text mt="4" color='blue' fontSize={"xl"}>Jarayonda |В проверку</Text>

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


            <Details modalControl={detailsModalControl} />
        </div>
    )
}

export default Jarayonda

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
