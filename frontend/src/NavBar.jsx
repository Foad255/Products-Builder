import {Container, Button, Flex , Text, HStack } from '@chakra-ui/react'
import { useColorMode} from "@/components/ui/color-mode"
import {Link} from 'react-router-dom'
import { MdCreateNewFolder} from "react-icons/md";

export default function NavBar() {
    // built-in hook
    const {colorMode, toggleColorMode} = useColorMode();
    return (
     <Container maxW={'1140px'} px={4} >
        <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}  
        flexDir={{
            base:'column',
            sm:'row'
        }}
        >
          <Text 
            fontSize={{base: '22', sm: '28'}}
            fontWeight={'bold'}
            textTransform={'uppercase'}
            textAlign={'center'}
            
          >
           <Link to={'/'}>Product home 🛒</Link>
          </Text>

          <HStack spacing={2} alignItems={'center'}>
            <Link to= {'/create'}>
                <Button>
                    <MdCreateNewFolder/>
                </Button>
            </Link>

            <Button onClick={toggleColorMode}>
                {colorMode === 'light'? 'Dark':'light'}
            </Button>

          </HStack>
        </Flex>
    </Container>
)
}