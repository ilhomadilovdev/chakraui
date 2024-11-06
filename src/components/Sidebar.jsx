
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Card, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='saidbar'>
      <Text fontWeight="700" color='gray.500' fontSize='3xl'>Bo'limlar</Text>
      <Card mt="3" p="2">
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box fontWeight="600" color='red.300' fontSize="xl" as='span' flex='1' textAlign='left'>
                  Ta'minot bo'limi
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>

              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as='span' flex='1' textAlign='left'>
                        Товары |Tovarlar
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Box mt="3" color="green.500 " fontWeight="600" fontSize="md"><Link to="tovarlar">Список товаров </Link></Box>
                    <Box mt="3" color="green.500 " fontWeight="600" fontSize="md"><Link to="xaridlar">Заказ на закупку</Link></Box>
                    <Box mt="3" color="green.800 " fontWeight="600" fontSize="md">Доставление|Yetib kelganlari</Box>

                  </AccordionPanel>
                </AccordionItem>


              </Accordion>

              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as='span' flex='1' textAlign='left'>
                        Закупка |Xaridlar
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>

                    <Accordion mt="2" allowToggle>
                      <AccordionItem>
                        <h2>
                          <AccordionButton p="2">
                            <Box fontWeight="600" color='gray.500' fontSize="md" as='span' flex='1' textAlign='left'>
                              На проверке | Tekshiruvdagilar
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <Box mt="3" p="2" color="gray.600 " fontSize="md"><Link to="jarayondagilar">В процессе | Jarayondagilar</Link></Box>
                          <Box mt="3" p="2" color="gray.600 " fontSize="md"><Link to="tekshiruv_otmadi">Не прошел проверку | Tekshiruvdan o'tmadi</Link></Box>
                          <Box mt="3" p="2" color="gray.600 " fontSize="md"><Link to={"tekshiruv_otdi"}>Прошел проверку | Tekshiruvdan o'tdi</Link></Box>

                        </AccordionPanel>
                      </AccordionItem>


                    </Accordion>
                    <Box mt="3" color="green.500 " fontWeight="600" fontSize="sm"><Link to="qabul_qilinganlar">Поступление | Qabul qilinganlar</Link></Box>
                    <Box mt="3" color="green.500 " fontWeight="600" fontSize="sm"><Link to="tugallangan_xaridlar">Завершение закупки | Tugalangan xaridlar</Link></Box>
                  </AccordionPanel>
                </AccordionItem>

              </Accordion>

            </AccordionPanel>
          </AccordionItem>


        </Accordion>
      </Card>

      <Card mt="3" p="2"> <Box fontWeight="600" color='red.300' fontSize="xl">Haydovchi bo'limi</Box></Card>
      <Card mt="3" p="2"> <Box fontWeight="600" color='red.300' fontSize="xl">
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box fontWeight="600" color='red.300' fontSize="xl" as='span' flex='1' textAlign='left'>
                  Yetkazib beruvchi
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Box mt="3" color="green.500 " fontWeight="600" fontSize="md"><Link to="">

                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                          Продажи | Sotuvlar
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Accordion allowToggle>
                        <AccordionItem>
                          <h2>
                            <Text fontSize="md" color="gray.400" p="3"><Link to={"new_buyurtma"}>Новые заказы </Link></Text>
                            <Text fontSize="md" color="gray.400" p="3"><Link to={"yetkazilgan"}>Доставленные</Link> </Text>
                            <Text fontSize="md" color="gray.400" p="3">
                              <Accordion allowToggle>
                                <AccordionItem>
                                  <h2>
                                    <AccordionButton>
                                      <Box as='span' flex='1' textAlign='left'>
                                        На проверке
                                      </Box>
                                      <AccordionIcon />
                                    </AccordionButton>
                                  </h2>
                                  <AccordionPanel pb={4}>
                                    <Text p="3" fontFamily={"cursive"}><Link to="jarayonda_yetkazib-beruvchi">В процессе</Link></Text>
                                    <Text p="3" fontFamily={"cursive"}><Link to="jarotmadiyetkazib">Не прошел проверку</Link></Text>
                                    <Text p="3" fontFamily={"cursive"}> <Link to="jarayondan_otdi_yetkazib">Прошел проверку</Link></Text>
                                  </AccordionPanel>
                                </AccordionItem>


                              </Accordion>
                            </Text>
                            <Text fontSize="md" color="gray.400" p="3"><Link to="sotuvlar">Завершение продажи </Link></Text>
                          </h2>

                        </AccordionItem>

                      </Accordion>
                    </AccordionPanel>
                  </AccordionItem>


                </Accordion>
              </Link></Box>
              <Box mt="3" color="green.500 " fontWeight="600" fontSize="md">
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                          Платежы|To'lovlar
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Accordion allowToggle>
                        <AccordionItem>
                          <h2>
                            <Text fontSize="md" color="gray.400" p="3"> <Link to="tolovlar">Баланс</Link> </Text>
                            <Text fontSize="md" color="gray.400" p="3"> <Link to="kiruvchi-tolov">Входящий платеж</Link> </Text>

                          </h2>

                        </AccordionItem>

                      </Accordion>
                    </AccordionPanel>
                  </AccordionItem>


                </Accordion>
              </Box>
            </AccordionPanel>
          </AccordionItem>


        </Accordion>
      </Box>
      </Card>

      <Card mt="3" p="2"> <Box fontWeight="600" color='red.300' fontSize="xl">
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box fontWeight="600" color='red.300' fontSize="xl" as='span' flex='1' textAlign='left'>
                  Laborant mobil
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text p="3" color="gray.500" fontFamily="revert" fontSize="lg"><Link to="laborant-yetkazilgan">Доставленные</Link></Text>
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as='span' flex='1' textAlign='left'>
                        <Text p="1" color="gray.500" fontFamily="revert" fontSize="lg">На проверку</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="laborant-jarayon">В процессе</Link></Text>
                    <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="laborant-qaytatekshirish">Перепроверка</Link></Text>
                    <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="laborant-tekshiruvdanotmadi">Не прошел проверку</Link></Text>
                    <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="laborant-tekshiruvdanotdi">Прошел проверку</Link></Text>
                  </AccordionPanel>
                </AccordionItem>

              </Accordion>
            </AccordionPanel>
          </AccordionItem>


        </Accordion>
      </Box>
      </Card>


      <Card mt="3" p="2"> <Box fontWeight="600" color='red.300' fontSize="xl">
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box fontWeight="600" color='red.300' fontSize="xl" as='span' flex='1' textAlign='left'>
                  Bosh laborant web-site
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text p="3" color="gray.500" fontFamily="revert" fontSize="lg"><Link to="boshlaborant-yetkazilgan">Доставленные</Link></Text>
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as='span' flex='1' textAlign='left'>
                        <Text p="1" color="gray.500" fontFamily="revert" fontSize="lg">На проверку</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="boshlaborant-jarayon">В процессе</Link></Text>
                    <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="boshlaborant-koribchiqish">Перепроверка</Link></Text>
                    <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="boshlaborant-otmadi">Не прошел проверку</Link></Text>
                    <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="boshlaborant-otdi">Прошел проверку</Link></Text>
                  </AccordionPanel>
                </AccordionItem>

              </Accordion>
            </AccordionPanel>
          </AccordionItem>


        </Accordion>
      </Box>
      </Card>

      <Card mt="3" p="2"> <Box fontWeight="600" color='red.300' fontSize="xl">
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box fontWeight="600" color='red.300' fontSize="xl" as='span' flex='1' textAlign='left'>
                  Ombor mudiri
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="lab-tekshiruvdan-otdi">Прошли проверку лаборатории</Link></Text>
              <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="jonatildi">Отгружено</Link></Text>
              <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="xarid-tugallandi">Завершение закупки</Link></Text>
            </AccordionPanel>
          </AccordionItem>


        </Accordion>
      </Box>
      </Card>


      <Card mt="3" p="2"> <Box fontWeight="600" color='red.300' fontSize="xl">
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box fontWeight="600" color='red.300' fontSize="xl" as='span' flex='1' textAlign='left'>
                  Moliya web ayt
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="moliya-xaridga-buyurtma">Заказ на закупку</Link></Text>
              <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="moliya-yetkazish">Доставленные</Link></Text>
              <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="moliya-laborant-korigi">На проверке лаборантов</Link></Text>
              <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="moliya-korikdanotdi">Прошел проверку</Link></Text>
              <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="moliya-yuklangan">Отружено</Link></Text>
              <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="moliya-xaridtugadi">Завершение закупки</Link></Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      </Card>


      <Card mt="3" p="2"> <Box fontWeight="600" color='red.300' fontSize="xl">
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box fontWeight="600" color='red.300' fontSize="xl" as='span' flex='1' textAlign='left'>
                  Ishlab chiqarish direktori
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="ishlabchiqarish-xaridga-buyurtma">Заказ на закупку</Link></Text>
              <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="ishlabchiqarish-yetkazish">Доставленные</Link></Text>
              <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="ishlabchiqarish-korik">На проверке </Link></Text>
              <Text p="2" color="gray.600" fontFamily="revert" fontSize="md"><Link to="ishlabchiqarish-tugallangan-xaridlar">Завершение закупки</Link></Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      </Card>
   
    </div>
  )
}
