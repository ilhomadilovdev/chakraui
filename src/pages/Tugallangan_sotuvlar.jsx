import { Center, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';


function Tugallangan_sotuvlar() {


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
                const response = await fetch('https://ventum-internship-backend.bis-apps.com/api/courier-purchase-order/completed/pagination/0', {
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
            <Text mt="4" color='blue' fontSize={"xl"}>Tugallangan sotuvlar |Завершение продажи</Text>

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
                                        <Td> {format(new Date(item.docDate), 'dd.MM.yyyy')}</Td>
                                        <Td> {format(new Date(item.docDueDate), 'dd.MM.yyyy')}</Td>
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

export default Tugallangan_sotuvlar