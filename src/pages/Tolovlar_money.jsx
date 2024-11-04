import { Button, Center, Input, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useState } from 'react'


function Tolovlar_money() {
    const [cardCode, setCardCode] = useState("")
    const [cardData, setCardData] = useState([])
    const [isloading, setisLoading] = useState(false);
    const [error, setError] = useState(null)

    //Korxona cardcode boyicha uni balansini ko'rish
    const handleBalanc = () => {
        const fetchBalans = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('Пользователь не авторизован');
                return;
            }
            setisLoading(true)
            try {
                const response = await fetch(`https://ventum-internship-backend.bis-apps.com/api/courier-purchase-order/balance/${cardCode}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Ошибка при получении данных');
                }

                const data = await response.json();
                setCardData(data?.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setisLoading(false)
            }
        };

        fetchBalans();
    }




    return (
        <div>

            <Text mt="2" color='red' fontFamily={"cursive"} fontSize={"xl"}>Agar sizga boshqa korxonalar balansi kerak bolsa pastdagi inputga tegishli korxona cardCodesini kiriting va qidiruv tugmasini bosing. <p>Misol uchun 0001 va 0002 CardCodelar kiritilgandan so'ng natija ko'rinadi</p></Text>



            <div>
                <div className='children_black  top'>
                    <Input
                        type='text'
                        placeholder="CardCodeni kiriting"
                        value={cardCode}
                        onChange={(e) => setCardCode(e.target.value)}
                    />
                    <Button colorScheme='blue' onClick={handleBalanc}>Qidirish</Button>
                </div>

                <div >
                    {isloading ? (
                        <Center mt="4">
                            <Spinner size="xl" />
                        </Center>
                    ) : error ? (<Text color="red">{error.message}</Text>) : (
                        <TableContainer mt="5" maxWidth={"980"}>

                            <Table variant="striped" colorScheme="teal">
                                <Thead>
                                    <Tr>
                                        <Th>cardCode</Th>
                                        <Th>cardName</Th>
                                        <Th>groupCode</Th>
                                        <Th>firstPhoneNumber</Th>
                                        <Th>openDeliveryNotesBalance</Th>
                                        <Th>openOrdersBalance</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr >
                                        <Td>{cardData.cardCode}</Td>
                                        <Td>{cardData.cardName}</Td>
                                        <Td> {cardData.groupCode}</Td>
                                        <Td> {cardData.currentAccountBalance}</Td>
                                        <Td> {cardData.openDeliveryNotesBalance}</Td>
                                        <Td> {cardData.openOrdersBalance}</Td>
                                    </Tr>

                                </Tbody>
                            </Table>
                        </TableContainer>

                    )}
                </div>
            </div>
        </div>
    )
}

export default Tolovlar_money