import { Box, Button, Center, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useModalControl } from "../../shared/lib/use-modal-control.js";
import { format } from 'date-fns';


function Yangi_buyurtmalar() {
    const toast = useToast()
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
                toast({
                    title: 'Успешно!',
                    description: 'Malumotlar olindi.',
                    status: 'success',
                    isClosable: true,
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false)
            }
        };

        fetchNewProduct();
    }, [])



    const detailsModalControl = useModalControl()

    const handleClickDetails = (item) => {
        detailsModalControl.open({ item })
    }

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
                <Text fontSize="2xl" color="blue" mt="8">Buyurtmalar</Text>
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

export default Yangi_buyurtmalar



export const Details = ({ modalControl }) => {


    const toast = useToast()


    const [avtoNumber, setAvtoNumber] = useState("")
    const [loading, setLoadingSearch] = useState(false);
    const [error, setError] = useState(null)

    const handleAvtoNumber = () => {
        const fetchNumber = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('Пользователь не авторизован');
                return;
            }

            setLoadingSearch(true);

            try {
                const response = await fetch(`https://ventum-internship-backend.bis-apps.com/api/courier-purchase-order/26??number=${avtoNumber}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        number: avtoNumber
                    }),
                });

                if (!response.ok) {
                    throw new Error('Ошибка при получении данных');
                }

                const data = await response.json();
                toast({
                    title: 'Успешно!',
                    description: 'Avtomobil raqami saqlandi.',
                    status: 'success',
                    isClosable: true,
                });



            } catch (error) {
                setError(error.message);
            } finally {
                setLoadingSearch(false);
            }
        };


        fetchNumber()
    }



    const { state, close } = modalControl

    const { item } = state

    const getContent = () => {
        if (!state.visible) {
            return <></>
        }

        return (
            <>      <div className='modal_flex'>

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

                </div>

            </div>
                <div>
                    <form >
                        <Input required type='text' value={avtoNumber} onChange={(e) => setAvtoNumber(e.target.value)} placeholder='avtomobil raqamini kiriting' />

                        <Button onClick={() => handleAvtoNumber()} mt="2" colorScheme='red' size='lg'>Добавить номер автомобиля</Button>
                    </form>
                </div>

            </>
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
