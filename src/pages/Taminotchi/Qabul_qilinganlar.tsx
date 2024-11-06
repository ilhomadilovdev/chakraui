import React, { useEffect, useState } from 'react'
import {
    Button, Center,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    Spinner, Table, TableContainer,
    Tbody, Td, Text, Th, Thead, Tr
} from '@chakra-ui/react';
import { useModalControl } from "../../shared/lib/use-modal-control.js";
import { format } from 'date-fns';


interface PurchaseOrder {
    docEntry: number;
    docNum: string;
    cardCode: string;
    cardName: string;
    docDate: string;
    docTotal: number;
    docDueDate: string;
    bplName: string;
    vatRegNum: string;
    branchId: number;
    docCurrency: string;
    documentLines: {
        itemDescription: string;
        itemCode: string;
        quantity: string | number;
        price: string | number
    }[];
}


export default function Qabul_qilinganlar() {
    const [data, setData] = useState<PurchaseOrder[]>([]);
    const [docData, setDocData] = useState<PurchaseOrder[]>([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);



    //Dokumentni olish
    const handleDocument = () => {
        const fetchocument = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('Пользователь не авторизован');
                return;
            }
            setLoading(true)
            try {
                const response = await fetch('https://ventum-internship-backend.bis-apps.com/api/supplier-purchase-delivery-notes/pagination/0', {
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
                setLoading(false)
            }
        };

        fetchocument();
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
                const response = await fetch('https://ventum-internship-backend.bis-apps.com/api/supplier-purchase-delivery-notes/pagination/0', {
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
        handleDocument()
    }, [])


    const detailsModalControl = useModalControl()

    const handleClickDetails = (item) => {
        detailsModalControl.open({ item })
    }


    return (
        <div>
            <Text mt="4" color="blue" fontSize="xl">
                Qabul qilinganlar
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
                                    <Tr key={item.docEntry}>
                                        <Td>{index + 1}</Td>
                                        <Td>{item.docNum}</Td>
                                        <Td>{item.cardName}</Td>
                                        <Td>{item.cardCode}</Td>
                                        <Td>{item.docDate}</Td>
                                        <Td>{item.docTotal}</Td>
                                        <Td>{item.docDueDate}</Td>
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



            <Details modalControl={detailsModalControl} />

        </div>
    )
}




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
                        <Button mr={3} onClick={close}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

