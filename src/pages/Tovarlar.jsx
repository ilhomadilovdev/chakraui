import {
  Button,
  Input,
  Modal, ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter, ModalHeader,
  ModalOverlay, Select, Spinner, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure,
  useToast
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'



// import axios from '../baseUrl/url'

function Tovarlar() {


  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [products, setData] = useState([])
  const [skip, setSkip] = useState(0);
  const [error, setError] = useState(null)

  //search
  const [searItem, setSearItem] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const [groupCode, setGroupCode] = useState("");
  const [tyes, setTyes] = useState("")
  const [codeResults, setCodeResults] = useState([])
  const [codeLoading, setCodeLoading] = useState(false)





  //изменит 
  const [isEditing, setIsEditing] = useState(null)

  const [itemGroup, setitemGroup] = useState([]);
  const [category, setCategory] = useState([])
  const [entryGroup, setEntryGroup] = useState([])

  const [tovar, setTovar] = useState("")

  const [itemgroup, setitemGroups] = useState("")
  const [categoryValue, setCategoryValue] = useState("")
  const [uoMGroupEntry, setuoMGroupEntry] = useState("")


  const [nameItem, setNameItem] = useState("")






  //inputitemsni qidirish
  const handleitemsGroupCode = () => {
    const fetchGroup = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }

      try {
        const response = await fetch('https://ventum-internship-backend.bis-apps.com/api/supplier-item-groups/pagination/0', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        const data = await response.json();
        setitemGroup(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchGroup();
  }
  //input categoryni qidirish
  const handleCategory = () => {
    const fetchCategory = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }

      try {
        const response = await fetch('https://ventum-internship-backend.bis-apps.com/api/supplier-ucategories', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        const data = await response.json();
        setCategory(data.data.validValuesMD);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategory();
  }

  //input uoMGroupEntryni o'zgartirish
  const handleuoMGroupEntry = () => {
    const fetcheuoMG = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }

      try {
        const response = await fetch('https://ventum-internship-backend.bis-apps.com/api/supplier-unit-of-measurement-groups/pagination/0', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        const data = await response.json();
        setEntryGroup(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetcheuoMG();
  }

  //yangi mahsulotni kiritish uchun funksiya
  const newProductEnter = () => {
    (e) => e.preventDefault()
    const newProduct = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }

      try {
        const request = await fetch('https://ventum-internship-backend.bis-apps.com/api/supplier-items', {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              itemName: tovar,
              itemsGroupCode: itemgroup,
              category: categoryValue,
              itemType: "itItems",
              uoMGroupEntry: uoMGroupEntry
            }
          )

        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');

        }
        const data = await request.json();
        toast({
          title: 'Новый продукт успешно создан!',
          description: `Продукт "${data.itemName}" добавлен.`,
          status: 'success',
          isClosable: true,
        });
      } catch (error) {
        setError(error.message);
      }
    };
    newProduct();

  }

  //item boyicha qidirish
  const handleItem = () => {
    const fetcheuoMG = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }
      setIsLoading(true)
      try {
        const response = await fetch(`https://ventum-internship-backend.bis-apps.com/api/supplier-items/search?itemName=${searItem}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        const data = await response.json();
        setSearchResults(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetcheuoMG();
  }



  //Patch






  const handleInputChange = (event) => {
    (e) => e.preventDefault()
    setTovar(event.target.value);
  }


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }

      try {
        const response = await fetch(`https://ventum-internship-backend.bis-apps.com/api/supplier-items/pagination/${skip}`, {
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
      }
    };

    fetchData();
  }, [skip]);


  const handleUpdate = async (index, updatedData) => {
    try {
      const response = await axios.patch(
        `https://ventum-internship-backend.bis-apps.com/api/supplier-items/${products[index].itemCode}`,
        updatedData
      );

      const newProducts = [...products];
      newProducts[index] = response.data.data;
      setData(newProducts);
      setIsEditing(null);
    } catch (error) {
      console.error('Error updating data:', error);

    }
  };

  console.log(products)

  const handlePageChange = (newSkip) => {
    setSkip(newSkip);
  };

  const handleEdit = (index) => {
    setIsEditing(index);
  };
  const handleGroupCode = () => {
    const fetcheuoGroup = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }
      setCodeLoading(true)
      try {
        const response = await fetch(`https://ventum-internship-backend.bis-apps.com/api/supplier-items/search?itemName=${nameItem}&groupCode=${groupCode}&valid=${tyes}&skip=0`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        const data = await response.json();
        setCodeResults(data?.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setCodeLoading(false);
      }
    };

    fetcheuoGroup();
  }
  return (
    <div>
      <Text mt="4" color="gray.800" fontWeight="700" fontSize="2xl">Qidiruv</Text>
      <Text mt="1" color="red.400" fontWeight="500" fontSize="xl">ItemName,groupCode va valid boyicha "filtrlash"</Text>
      <div>
        <div className='flex_one'>
          <Input value={groupCode} onChange={(e) => setGroupCode(e.target.value)} maxW="250" placeholder='groupCode kiriting' />
          <Input value={nameItem} onChange={(e) => setNameItem(e.target.value)} maxW="250" placeholder='ItemNameni kiriting' />
          <Input value={tyes} onChange={(e) => setTyes(e.target.value)} maxW="250" placeholder='validni kiriting' />
          <Button onClick={handleGroupCode} colorScheme='blue' size="md" p="2">Qidirish</Button>
        </div>


        {codeLoading ? (<Spinner size="xs" />) : (
          <>

            <Table variant='simple'>
              {codeResults.length > 0 && <Thead>
                <Tr >
                  <Th>Sr.</ Th>
                  <Th>itemCode</Th>
                  <Th>itemName</Th>
                  <Th>itemsGroupCode:</Th>
                  <Th>category</Th>
                  <Th>salesUnit</Th>
                  <Th>typeOfGoods</Th>
                </Tr>
              </Thead>}
              <Tbody>
                {codeResults.map((el) => (
                  <Tr >
                    <Td>{el?.itemCode}</Td>
                    <Td>{el?.itemName}</Td>
                    <Td >{el?.itemsGroupCode}</Td>
                    <Td>{el.category}</Td>
                    <Td>{el.salesUnit}</Td>
                    <Td>{el.typeOfGoods}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </>
        )}
      </div>












      <div>
        <Text mt="2" color="blue.400" fontWeight="500" fontSize="xl">ItemName boyicha qidirish:</Text>
        <div>
          <div className='flex_one'>
            <Input mt="2" maxW="250"
              value={searItem}
              onChange={(e) => setSearItem(e.target.value)}
              placeholder='itemNamenni kiriting' />
            <Button
              onClick={handleItem}
              colorScheme='blue' size="md" p="2">Qidirish</Button>
          </div>

          {isLoading ? (<Spinner mt="3" size="md" />) : (
            <Table variant='simple'>
              {searchResults.length > 0 && <Thead>
                <Tr >
                  <Th>Sr.</ Th>
                  <Th>itemCode</Th>
                  <Th>itemName</Th>
                  <Th>itemsGroupCode:</Th>
                  <Th>category</Th>
                  <Th>salesUnit</Th>
                  <Th>typeOfGoods</Th>
                </Tr>
              </Thead>}
              <Tbody>
                {searchResults.map((el) => (
                  <Tr >
                    <Td>{el?.itemCode}</Td>
                    <Td>{el?.itemName}</Td>
                    <Td >{el?.itemsGroupCode}</Td>
                    <Td>{el.category}</Td>
                    <Td>{el.salesUnit}</Td>
                    <Td>{el.typeOfGoods}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </div>
      </div>


      <div>
        <Text mt="2" color="gray.500" fontWeight="600" fontSize="2xl">Список товаров</Text>
        <div style={{ height: '500px', overflowY: 'auto', }}>
          <Table variant="striped">
            <Thead>
              <Tr >
                <Th>Sr.</ Th>
                <Th>
                  itemCode
                </Th>
                <Th>itemName</Th>
                <Th>itemsGroupCode:</Th>
                <Th>category</Th>
                <Th>salesUnit</Th>
                <Th>typeOfGoods</Th>
              </Tr>
            </Thead>

            <Tbody >

              {
                products.length > 0 ? (
                  products?.map((el, index) =>
                  (
                    <Tr >
                      <Td>{index + 1}</Td>
                      <Td>
                        {isEditing === index ? (
                          <Input
                            type="text"
                            value={el.itemCode}
                            onChange={(e) =>
                              handleUpdate(index, { ...el, itemCode: e.target.value })
                            } />
                        ) : (el?.itemCode)}

                      </Td>
                      <Td>
                        {isEditing === index ? (
                          <Input
                            type="text"
                            value={el.itemName}
                            onChange={(e) =>
                              handleUpdate(index, { ...el, itemCode: e.target.value })
                            } />
                        ) : (el?.itemName)}
                      </Td>

                      <Td >
                        {isEditing === index ? (
                          <Select mt="5" size='md'
                            onClick={handleitemsGroupCode}
                            onChange={(e) =>
                              handleUpdate(index, { ...el, itemCode: e.target.value })
                            }
                            placeholder='itemgroupni tanlang'>
                            {itemGroup.map((item, index) => (
                              <option key={item.index} value={item.value}>
                                {item.number}
                              </option>
                            ))}
                          </Select>
                        ) : (el?.itemsGroupCode)}
                      </Td>
                      <Td>
                        {isEditing === index ? (
                          <Select size='md' mt="5"
                            onClick={handleCategory}
                            onChange={(e) =>
                              handleUpdate(index, { ...el, itemCode: e.target.value })
                            }
                            placeholder='category tanlang'>
                            {category?.map((item, index) => (
                              <option key={item.index} value={item.value}>
                                {item.description}
                              </option>
                            ))}
                          </Select>
                        ) : (el?.category)}
                      </Td>

                      <Td>
                        {isEditing === index ? (
                          <Input
                            type="text"
                            value={el.salesUnit}
                            onChange={(e) =>
                              handleUpdate(index, { ...el, itemCode: e.target.value })
                            } />
                        ) : (el?.salesUnit)}
                      </Td>
                      <Td>
                        {isEditing === index ? (
                          <Input
                            type="text"
                            value={el.typeOfGoods}
                            onChange={(e) =>
                              handleUpdate(index, { ...el, itemCode: e.target.value })
                            } />
                        ) : (el?.typeOfGoods)}
                      </Td>
                      <Td>
                        {isEditing === index ? (
                          <Button colorScheme='red' onClick={() => setIsEditing(null)}>Save</Button>
                        ) : (
                          <Button colorScheme='green' onClick={() => handleEdit(index)}>Edit</Button>
                        )}
                      </Td>
                    </Tr>
                  )
                  )
                ) : (
                  <Th>yuklanmoqda</Th>
                )
              }
            </Tbody>
          </Table>

        </div >



        <Stack spacing={25} mt="10" direction='row' align='center'>
          <Button colorScheme='teal' p="4" size='lg' onClick={() => handlePageChange(skip - 1)} disabled={skip === 0}>
            Предыдущая
          </Button>
          <Button colorScheme='blue' p="4" size='lg' onClick={() => handlePageChange(skip + 1)} disabled={skip === 100}>
            Следующая
          </Button>
        </Stack>

      </div>

      <Stack mt={"45"} spacing={4} direction='row' align='center'>
        <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Yangi mahsulotni kiriting</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input type='text'
                value={tovar}
                onChange={handleInputChange}
                placeholder='tovar nomini kiriting' size='md' />

              <Select mt="5" size='md'
                onClick={handleitemsGroupCode}
                value={itemgroup}
                onChange={(e) => setitemGroups(e.target.value)}
                placeholder='itemgroupni tanlang'>
                {itemGroup.map((item, index) => (
                  <option key={item.index} value={item.value}>
                    {item.number}
                  </option>
                ))}
              </Select>
              <Select size='md' mt="5"
                onClick={handleCategory}
                value={categoryValue}
                onChange={(e) => setCategoryValue(e.target.value)}
                placeholder='category tanlang'>
                {category?.map((item, index) => (
                  <option key={item.index} value={item.value}>
                    {item.description}
                  </option>
                ))}
              </Select>
              <Select

                size='md' mt="5" >
                <option value='itItems'>itItems</option>
              </Select>
              <Select
                onClick={handleuoMGroupEntry} mt="5"
                value={uoMGroupEntry}
                onChange={(e) => setuoMGroupEntry(e.target.value)}
                placeholder='uoMGroupEntry tanlang'>
                {entryGroup?.map((item, index) => (
                  <option key={item.index} value={item.value}>
                    {item.absEntry}
                  </option>
                ))}
              </Select>

            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button onClick={newProductEnter} colorScheme='red' variant='ghost'>Yuborish</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Button colorScheme="blue" size='lg' onClick={onOpen}>  Создат новый товар|Yangi mahsulot qo'shish</Button>

      </Stack>
    </div>
  )
}

export default Tovarlar













