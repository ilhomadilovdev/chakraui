
import { FaEyeSlash } from "react-icons/fa";
import { Button, Card, CardBody, Container, Flex, Input, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { checkIsauth, loginUser } from "../redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";


function Main() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  // const { status } = useSelector(state => state.auth)
  const isAuth = useSelector(checkIsauth)
  const navigate = useNavigate()








  useEffect(() => {

    if (isAuth) {
      navigate("/to")

    }


  }, [isAuth, ])

  const handleSubmit = async () => {
    (e) => e.preventDefault()
    try {
      dispatch(loginUser({ username, password }))
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <>
      <Container mt="28" maxW="500">
        <form onSubmit={(e) => e.preventDefault(handleSubmit())}>
          <Card bg="gray.100">
            <CardBody>
              <Text fontSize='2xl' fontWeight="600" color={"black.400"}>Kirish</Text>
              <Text fontSize='md' mt="2" color={"gray.500"}>Kirish uchun login va parolni kiriting</Text>
              <Text fontSize="lg" mt="8" fontWeight="400" color="black.500">Login</Text>

              <Stack mt="2" >
                <Input type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Login'
                  size='md' />
              </Stack>




              <Text fontSize="lg" mt="8" fontWeight="400" color="black.500">Parol</Text>
              <Flex alignItems="center" mt="2" >
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Parol'
                  size='md' />
                <Stack maxW="35" pl="4"><FaEyeSlash /></Stack>
              </Flex>


              <Stack mt="45">
                <Button padding="15" type="submit" colorScheme='teal'>Kiritish</Button>
              </Stack>


            </CardBody>

          </Card>
        </form>


      </Container>




    </>
  )
}

export default Main