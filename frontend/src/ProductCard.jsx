import {Box, Image, Text, IconButton, Heading,HStack } from '@chakra-ui/react'
import { useColorModeValue} from "@/components/ui/color-mode"
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import {useProductStore} from './store/product'
import {message} from 'antd'

export default function ProductCard({product}) {
  const textColor = useColorModeValue('gray.600', 'gray.200')
  const bg = useColorModeValue('white', 'gray.200')

  const {deleteProducts} = useProductStore()

  const handleDelete = async () => {
   const {success} = deleteProducts(product._id)
    if(success === true) {
      message.success('Product Deleted')
    } else if(success === false) {
      message.error('Error')
    }
  }

  const handleEdit = async () => {
    
  }
  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{transform: 'translateY(-5px)' , shadow:'x1'}}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} W='full' objectFit='cover' />
      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight='bold' fontSize='x1' color={textColor} mb={4}>
          `${product.price}`
        </Text>

        <HStack>
          <IconButton icon={<CiEdit />} colorScheme='blue' />
          <IconButton icon={<MdDelete />} onClick={handleDelete} colorScheme = 'red' />
        </HStack>
      </Box>
    </Box>
  )
}