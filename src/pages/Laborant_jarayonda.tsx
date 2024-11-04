import React, { useEffect, useState } from 'react'
import { Center, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
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
    timer1: string;
    documentLines: {
        itemDescription: string;
        itemCode: string;
        quantity: string | number;
        price: string | number
    }[];
}





function Laborant_jarayonda() {
    const [data, setData] = useState<PurchaseOrder[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Пользователь не авторизован');
                return;
            }
            setLoading(true)
            try {
                const response = await fetch('https://ventum-internship-backend.bis-apps.com/api/laboratorian-purchase-orders/by-status/3/pagination/0', {
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
            <Text mt="4" color='blue' fontSize={"xl"}>Tekshiruvdan o'tmoqda</Text>

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
                                    <Tr >
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

export default Laborant_jarayonda