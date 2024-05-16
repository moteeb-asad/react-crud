import React from 'react'
import {
  Box,
  Flex,
  Hide,Show,
  HStack,
  IconButton,Input,InputGroup,InputLeftElement,
  useDisclosure,
  useColorModeValue,
  Stack,
  Container,
  Heading,
  Image,Button,Text, Link as ChakraLink
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon,Search2Icon } from '@chakra-ui/icons';
import { NavLink, Link as ReactRouterLink } from 'react-router-dom';



function Header() {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
    <Container maxW="10xl" bg={"#fff"}>
      <Container maxW='8xl' >
        <Box bg={useColorModeValue('#fff', 'gray.900')} className="header-box" >
          <Show below='md' >
              <HStack mb={4} className="header-main-text">
                <ChakraLink as={ReactRouterLink} to='/' className='app-title'>    
                    <Heading as='h2' size='2xl' color="#000" style={{ color:'#000', fontWeight: 'bold', fontSize:'1.875rem',lineHeight:'30px' }}>
                        React CRUD
                    </Heading>
                </ChakraLink>    
              </HStack>
          </Show>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'} className="header-nav">
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                  <NavLink to='/' ><span>Home</span></NavLink>
              </HStack>
            </HStack>
            <Hide below='md'>
              <HStack>
                  <ChakraLink as={ReactRouterLink} to='/' className='app-title'> 
                    <Heading as='h2' size='2xl' color="#000" style={{ color:'#000', fontWeight: 'bold', fontSize:'1.875rem',lineHeight:'30px' }}>
                        React CRUD
                    </Heading>
                  </ChakraLink>
              </HStack>
            </Hide>
            <HStack spacing={8} alignItems={'center'} className="header-nav">
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                  <NavLink to='/details' ><span>Details</span></NavLink>
              </HStack>
            </HStack>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }} className='mobile-nav'>
              <Stack as={'nav'} spacing={4}>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/details'>Details</NavLink>
              </Stack>
            </Box>
          ) : null}
        </Box>
      </Container> 
    </Container> 
    </>
  )
}

export default Header