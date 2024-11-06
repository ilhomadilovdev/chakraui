import React, { useEffect, useState } from 'react'
import { Center, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';


function Kiruvchi_tolov() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)


    useEffect(() => {
        const fetchBalans = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('Пользователь не авторизован');
                return;
            }
            setLoading(true)
            try {
                const response = await fetch('https://ventum-internship-backend.bis-apps.com/api/courier-purchase-order/vendor-payment/0001', {
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

        fetchBalans();
    }, [])

    return (
        <div>

            <Text mt="4" fontSize="xl" fontFamily="mono">Kiruvchi to'lovlar</Text>
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
                                <Th>cashSum</Th>
                                <Th>cashSumFC</Th>
                                <Th>docCurrency</Th>
                                <Th>docEntry</Th>
                                <Th>bplName</Th>
                                <Th>vatRegNum</Th>
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
                                    <Td>{item.cashSum}</Td>
                                    <Td>{item.cashSumFC}</Td>
                                    <Td>{item.docCurrency}</Td>
                                    <Td>{item.docEntry}</Td>
                                    <Td>{item.bplName}</Td>
                                    <Td>{item.vatRegNum}</Td>
                                
                                   
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>

            )}
        </div>
    )
}

export default Kiruvchi_tolov