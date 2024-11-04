import { Button, Center, Input, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'

function Yangi_buyurtmalar() {
    const [newProduct, setNewProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)


    //search
    const [searchCard, setSearchCard] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [loadingSearch, setLoadingSearch] = useState(false);

    // const [startDate, setStartDate] = useState("");
    // const [dataProduct, setDataProduct] = useState([])


    const handleSearchButton = () => {
        const fetchSearch = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('Пользователь не авторизован');
                return;
            }
            setLoadingSearch(true)
            try {
                const response = await fetch(`https://ventum-internship-backend.bis-apps.com/api/courier-purchase-order/new/pagination/1?${searchCard}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Ошибка при получении данных');
                }

                const data = await response.json();
                setSearchData(data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoadingSearch(false)
            }
        };

        fetchSearch()
    }




    useEffect(() => {
        const fetchNewProduct = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('Пользователь не авторизован');
                return;
            }
            setLoading(true)
            try {
                const response = await fetch(`https://ventum-internship-backend.bis-apps.com/api/courier-purchase-order/new/pagination/1`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Ошибка при получении данных');
                }

                const data = await response.json();
                setNewProduct(data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false)
            }
        };

        fetchNewProduct();
    }, [])
    return (
        <div className='black'>
            <div>
                <Text fontFamily="inherit" fontSize="lg" color="blackAlpha.500">Qidirish</Text>
                <div className='children_black'>
                    <Input value={searchCard} onChange={(e) => setSearchCard(e.target.value)} placeholder='cardNameni kiriting' />
                    <Button onClick={handleSearchButton} colorScheme="blue">Qidirish</Button>
                </div>

                {loadingSearch ? (
                    <Center mt="4">
                        <Spinner size="xl" />
                    </Center>
                ) : error ? (
                    <Text color="red">{error}</Text>
                ) : (
                    <TableContainer mt="1" maxWidth="980">
                        <Table variant="striped" colorScheme="teal">
                            {searchData.length > 0 && <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>docNum</Th>
                                    <Th>cardName</Th>
                                    <Th>docDate</Th>
                                    <Th>docTotal</Th>
                                    <Th>docDueDate</Th>
                                    <Th>Item Description</Th>
                                </Tr>
                            </Thead>}
                            <Tbody>
                                {searchData.map((item, index) => (
                                    <Tr >
                                        <Td>{index + 1}</Td>
                                        <Td>{item.docNum}</Td>
                                        <Td>{item.cardName}</Td>
                                        <Td> {format(new Date(item.docDate), 'dd.MM.yyyy')}</Td>
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





            <div>
                <Text fontSize="2xl" mt="8">Buyurtmalar</Text>
                {loading ? (
                    <Center mt="4">
                        <Spinner size="xl" />
                    </Center>
                ) : error ? (
                    <Text color="red">{error}</Text>
                ) : (
                    <TableContainer mt="1" maxWidth="980">
                        <Table variant="striped" colorScheme="teal">
                            {newProduct.length > 0 && <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>docNum</Th>
                                    <Th>cardName</Th>
                                    <Th>docDate</Th>
                                    <Th>docTotal</Th>
                                    <Th>docDueDate</Th>
                                    <Th>Item Description</Th>
                                </Tr>
                            </Thead>}
                            <Tbody>
                                {newProduct.map((item, index) => (
                                    <Tr >
                                        <Td>{index + 1}</Td>
                                        <Td>{item.docNum}</Td>
                                        <Td>{item.cardName}</Td>
                                        <Td> {format(new Date(item.docDate), 'dd.MM.yyyy')}</Td>
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



    )
}

export default Yangi_buyurtmalar