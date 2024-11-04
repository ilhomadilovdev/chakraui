import React, { useEffect, useState } from 'react'
import { Box, Card, CardBody,  Center, Flex, Heading, Spinner, Stack, StackDivider, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
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
        itemCode:string;
        quantity:string|number;
        price:string|number
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
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )}
            </div>

            <Text mt="4" color="blue" fontSize="xl">Document</Text>
            {docData.map((el, idx) => (
                <Card >
                    <Flex>
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        cardName
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {el.cardName}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        docDate
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                    {format(new Date(el.docDate), 'dd.MM.yyyy')} 
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        docDueDate
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                    {format(new Date(el.docDueDate), 'dd.MM.yyyy')} 
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        docTotal
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {el.docTotal}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        docCurrency
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {el.docCurrency}
                                    </Text>
                                </Box>
                           
                            </Stack>
                        </CardBody>


                        <CardBody>
                            <Stack divider={<StackDivider />} spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                  itemCode
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {el.documentLines[idx].itemCode}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    itemDescription
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {el.documentLines[idx].itemDescription}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    quantity
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {el.documentLines[idx].quantity}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    price
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {el.documentLines[idx].price}
                                    </Text>
                                </Box>
                               
                            </Stack>
                        </CardBody>
                    </Flex>
                </Card>
            ))}



        </div>
    )
}
