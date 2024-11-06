import {
  Button,
  Input,
  Modal, ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter, ModalHeader,
  ModalOverlay, Select, Spinner, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useModalControl } from "../../shared/lib/use-modal-control.js";



function Xaridlar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //search cardname and data
  const [searchCardName, setSearchCardName] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [productCard, setProductCard] = useState([])


  const [searchDate, setSearchDate] = useState(new Date());
  const [searchEndDate, setSearchEndDate] = useState(new Date())
  const [dataDate, setDateDate] = useState([]);
  const [loadingDate, setLoadingDate] = useState(false)


  //Buyurtmalarni olish
  const [order, setOrder] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  //cardcodeni olish va uni yuborish
  const [cardcod, setCardcod] = useState([])
  const [cardloading, setCardloading] = useState(false)

  const [cardCode, setCardcode] = useState("")


  //branchIdni olish
  const [branch, setBranch] = useState([])
  const [branchloading, setBranchLoading] = useState(false)

  //itemCode olish
  const [itemCode, setItemcode] = useState([])
  const [itemloading, setItemloading] = useState(false)


  //warehouseCode olish
  const [warehouseCode, setWarehouseCode] = useState([])
  const [warehLoading, setWarehLoading] = useState(false)

  const [ware, setWare] = useState("")

  //yangi xarid uchun mahsulot kiritish
  const newPurchaseOrder = () => {
    (e) => e.preventDefault()
    const newPurchase = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }

      try {
        const request = await fetch('https://ventum-internship-backend.bis-apps.com/api/supplier-purchase-orders/by-status/1/pagination/0', {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              cardCode: cardCode,
              cardName: cardName,
              docDate: docDate,
              docCurrency: value,
              docDueDate: docDuate,
              branchId: branchID,
              documentLines: [
                {
                  itemCode: codeItem,
                  itemDescription: textarea,
                  unitPrice: price,
                  quantity: quantity,
                  warehouseCode: ware
                }
              ],

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
    newPurchase();

  }

  //searchCardName
  const handleSearch = () => {
    const fetchSearch = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }
      setSearchLoading(true)
      try {
        const response = await fetch(`https://ventum-internship-backend.bis-apps.com/api/supplier-purchase-orders/by-card-name-and-status/${searchCardName}/1/pagination/0`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        const data = await response.json();
        setProductCard(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setSearchLoading(false);
      }
    };
    fetchSearch();
  }

  //search by date
  const handleSearchDate = () => {
    const fetchSearchDate = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }
      setLoadingDate(true)
      try {
        const response = await fetch(`https://ventum-internship-backend.bis-apps.com/api/supplier-purchase-orders/by-between-doc-date/${searchDate.toISOString().slice(0, 10)}/${searchEndDate.toISOString().slice(0, 10)}/status/1/pagination/0`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        const data = await response.json();
        setDateDate(data?.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoadingDate(false);
      }
    };
    fetchSearchDate();
  }

  const handleOrder = () => {
    const fetchOrder = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }
      setLoading(true)
      try {
        const response = await fetch(`https://ventum-internship-backend.bis-apps.com/api/supplier-purchase-orders/by-status/1/pagination/0`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        const data = await response.json();
        setOrder(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }



  useEffect(() => {
    handleOrder()

  }, [])







  //cardcodeni oladigan funksiya
  const handleCardcord = () => {
    const fetchCardcode = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }
      setCardloading(true)
      try {
        const response = await fetch(`https://ventum-internship-backend.bis-apps.com/api/supplier-business-partners/vendors/pagination/0`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        const data = await response.json();
        setCardcod(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setCardloading(false);
      }
    }

    fetchCardcode()
  }

  //branchIdni oladigan funksiya

  const branchId = () => {
    const fetchBrachId = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }
      setBranchLoading(true)
      try {
        const response = await fetch('https://ventum-internship-backend.bis-apps.com/api/supplier-departments/pagination/0', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        const data = await response.json();
        setBranch(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setBranchLoading(false);
      }
    }

    fetchBrachId();
  }


  //itemCodeni olish
  const handleItemCode = () => {
    const fetchCode = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }
      setItemloading(true)
      try {
        const response = await fetch('https://ventum-internship-backend.bis-apps.com/api/supplier-items/by-warehouse/01/by-price-list/1/pagination/0', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        const data = await response.json();
        setItemcode(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setItemloading(false);
      }
    }

    fetchCode();
  }


  //warehouseCode olish
  const handleWarehouseCode = () => {
    const fetchWareHouse = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Пользователь не авторизован');
        return;
      }
      setWarehLoading(true)
      try {
        const response = await fetch('https://ventum-internship-backend.bis-apps.com/api/supplier-warehouses/pagination/0', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        const data = await response.json();
        setWarehouseCode(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setWarehLoading(false);
      }
    }

    fetchWareHouse();
  }

  //cardName kiritish
  const [cardName, setCardname] = useState("");

  //docDate kiritish
  const [docDate, setDocDate] = useState("");

  //docDuate kiritish
  const [docDuate, setDocDuate] = useState("");

  //codeItem kiritish
  const [codeItem, setCodeItem] = useState("")

  //branchId kiritish
  const [branchID, setBranchID] = useState("");

  //textarea kiritish
  const [textarea, setTextare] = useState("");

  //quantityni olish
  const [quantity, setQuantity] = useState("");

  //price
  const [price, setPrice] = useState("")
  console.log(order)




  const detailsModalControl = useModalControl()

  const handleClickDetails = (item) => {
    detailsModalControl.open({ item })
  }

  return (
    <div>

      <div>
        <Text fontSize="lg" color="gray"> Qidiruv</Text>
        <div>
          <Text mt="2" fontFamily="cursive" fontSize="lg" color='yellow.400'>CardName bo'yicha qidirish</Text>
          <div className='children_black'>
            <Input value={searchCardName} onChange={(e) => setSearchCardName(e.target.value)} placeholder='cardNameni qidiring' />
            <Button onClick={handleSearch} colorScheme='teal' size='md'>Qidirish</Button>
          </div>

          <Table mt="1" variant="striped">
            {productCard.length > 0 && <Thead>
              <Tr >
                <Th>Sr.</ Th>
                <Th>DocNum</Th>
                <Th>cardName</Th>
                <Th>docDate</Th>
                <Th>docDueDate</Th>
                <Th>itemDescription</Th>
                <Th>docTotal</Th>
                <Th>branch</Th>
              </Tr>
            </Thead>}

            <Tbody >
              {searchLoading ? (
                <Spinner size="md" />
              ) : error ? (
                <Text>Error: {error.message}</Text>
              ) : (
                productCard?.map((el, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{el?.docNum}</Td>
                    <Td>{el?.cardName}</Td>
                    <Td>{format(new Date(el?.docDate), 'dd.MM.yyyy')}</Td>
                    <Td>{format(new Date(el?.docDueDate), 'dd.MM.yyyy')}</Td>
                    <Td>{el?.documentLines[0].itemDescription}</Td>
                    <Td>{el?.docTotal}</Td>
                    <Td>{el?.branchId}</Td>

                  </Tr>
                ))
              )}

            </Tbody>
          </Table>
        </div>


        <div>
          <Text mt="2" fontFamily="cursive" fontSize="lg" color='blue'>Sanalar bo'yicha qidirish 'defolt 10/12/2024 va 10/20/2024ni tanlang '</Text>
          <div className='children_black'>
            <DatePicker required selected={searchDate} onChange={(date) => setSearchDate(date)} placeholder='boshlangich sanani kiriting (StartDate)' />
            <DatePicker required selected={searchEndDate} onChange={(date) => setSearchEndDate(date)} placeholder='yakuniy sanani sanani kiriting (EndDate)' />
            <Button onClick={handleSearchDate} colorScheme='teal' size='lg'>Qidirish</Button>
          </div>

          <Table mt="1" variant="striped">
            {dataDate.length > 0 && <Thead>
              <Tr >
                <Th>Sr.</ Th>
                <Th>DocNum</Th>
                <Th>cardName</Th>
                <Th>docDate</Th>
                <Th>docDueDate</Th>
                <Th>itemDescription</Th>
                <Th>docTotal</Th>
                <Th>branch</Th>
              </Tr>
            </Thead>}

            <Tbody >
              {loadingDate ? (
                <Spinner size="md" />
              ) : error ? (
                <Text>Error: {error.message}</Text>
              ) : (
                dataDate?.map((el, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{el?.docNum}</Td>
                    <Td>{el?.cardName}</Td>
                    <Td>{format(new Date(el?.docDate), 'dd.MM.yyyy')}</Td>
                    <Td>{format(new Date(el?.docDueDate), 'dd.MM.yyyy')}</Td>
                    <Td>{el?.documentLines[0].itemDescription}</Td>
                    <Td>{el?.docTotal}</Td>
                    <Td>{el?.branchId}</Td>

                  </Tr>
                ))
              )}

            </Tbody>
          </Table>
        </div>

      </div>

      <div>
        <Text mt="4" fontSize="2xl" color={"red"}>Список на покупки</Text>
        <Table mt="1" variant="striped">
          <Thead>
            <Tr >
              <Th>Sr.</ Th>
              <Th>DocNum</Th>
              <Th>cardName</Th>
              <Th>docDate</Th>
              <Th>docDueDate</Th>
              <Th>itemDescription</Th>
              <Th>docTotal</Th>
              <Th>branch</Th>
            </Tr>
          </Thead>

          <Tbody >
            {loading ? (
              <Text>Ma'lumotlar yuklanmoqda</Text>
            ) : error ? (
              <Text>Error: {error.message}</Text>
            ) : (
              order?.map((item, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{item?.docNum}</Td>
                  <Td>{item?.cardName}</Td>
                  <Td>{format(new Date(item?.docDate), 'dd.MM.yyyy')}</Td>
                  <Td>{format(new Date(item?.docDueDate), 'dd.MM.yyyy')}</Td>
                  <Td>{item?.documentLines[0].itemDescription}</Td>
                  <Td>{item?.docTotal}</Td>
                  <Td>{item?.branchId}</Td>

                  <Td>
                    <Button color={"white"} colorScheme='blue' onClick={() => handleClickDetails(item)}>
                      Details
                    </Button>
                  </Td>

                </Tr>
              ))
            )}

          </Tbody>
        </Table>



        <Stack mt={"45"} spacing={4} direction='row' align='center'>
          <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Yangi mahsulotni kiriting</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Select mt="5" size='md'
                  onClick={handleCardcord}
                  value={cardCode}
                  onChange={(e) => setCardcode(e.target.value)}
                  placeholder={cardloading ? "yuklanmoqda" : "Cardcodeni kiriting"}>
                  {cardcod.map((item, index) => (
                    <option key={item.index} value={item.value}>
                      {item.cardCode}
                    </option>
                  ))}
                </Select>


                <Input mt="4" type='text'
                  value={cardName}
                  onChange={(e) => setCardname(e.target.value)}
                  placeholder='cardName nomini kiriting'
                  size='md' />


                <Input mt="4" type='text'
                  value={docDate}
                  onChange={(e) => setDocDate(e.target.value)}
                  placeholder='docDate nomini kiriting' size='md' />


                <Select mt="4" placeholder='docCurrency ni kiriting'>
                  <option value='USD'>USD</option>
                  <option value='UZS'>UZS</option>
                </Select>


                <Input mt="4" size="md"
                  value={docDuate}
                  onChange={(e) => setDocDuate(e.target.value)}
                  placeholder='docDueDate' />


                <Select size='md' mt="5"
                  onClick={branchId}
                  value={branchID}
                  onChange={(e) => setBranchID(e.target.value)}
                  placeholder={branchloading ? "yuklanmoqda" : "branchIdni kiriting"}>
                  {branch.map((item, index) => (
                    <option key={item.index} value={item.value}>
                      {item.bplid}
                      <br />
                      {item.bplName}

                    </option>
                  ))}
                </Select>


                <Select size='md' mt="5"
                  onClick={handleItemCode}
                  value={codeItem}
                  onChange={(e) => setCodeItem(e.target.value)}
                  placeholder={itemloading ? "yuklanmoqda" : "itemCodeni kiriting"}>
                  {itemCode.map((item, index) => (
                    <option key={item.index} value={item.value}>
                      {item.itemCode}
                    </option>
                  ))}
                </Select>


                <div className='description'>
                  <label for="story">description:izoh uchun</label>

                  <textarea
                    value={textarea}
                    onChange={(e) => setTextare(e.target.value)}
                    className='textarea_' id="story" name="story"  >

                  </textarea>
                </div>



                <Select size='md' mt="5"
                  onClick={handleItemCode}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder={itemloading ? "yuklanmoqda" : "price"}>
                  {itemCode.map((item, index) => (
                    <option key={item.index} value={item.value}>
                      {item.price}
                    </option>
                  ))}
                </Select>



                <Input mt="4" type='text'
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder='quantity kiriting'
                  size='md' />

                <Select
                  onClick={handleWarehouseCode} mt="5"
                  value={ware}
                  onChange={(e) => setWare(e.target.value)}
                  placeholder={warehLoading ? "yuklanmoqda" : "warehouseCode ni tanlang"}>
                  {warehouseCode?.map((item, index) => (
                    <option key={item.index} value={item.value}>
                      {item.warehouseCode}
                    </option>
                  ))}
                </Select>

              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme='red' onClick={newPurchaseOrder} variant='ghost'>Yuborish</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Button colorScheme="blue" size='lg' onClick={onOpen}> Создать новый заказ на закупку qo'shish</Button>




        </Stack>
      </div>



      <Details modalControl={detailsModalControl} />

    </div>
  )
}

export default Xaridlar




export const Details = ({ modalControl }) => {
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

        <Button mt="2" colorScheme='red' size='lg'>Изменить статус на доставлено</Button>
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
