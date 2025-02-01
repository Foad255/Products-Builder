import { useState } from 'react';
import { Box, Button, Flex, Input, VStack, Heading} from '@chakra-ui/react';
import {message} from 'antd'
import {useProductStore} from './store/product'

const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  const {createProduct} =  useProductStore();
 
  const handleNewProduct = async (e) => {
    e.preventDefault();  // don't submit
   const {success, msg} = await createProduct(newProduct)
    if(success === true) {
        message.success(msg)
        setNewProduct({name: '', price: '', image:''})

    } else if (success === false) {
        message.error('invalid information')
      }
    
    }
   
   
  

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-r, teal.500, green.500)"
    >
      <VStack>
        <Heading as="h1" fontSize="30px" fontWeight="bold" textAlign="center" mb={8}>
          Create New Product
        </Heading>
        <Box
          bg="white"
          p={8}
          borderRadius="md"
          boxShadow="lg"
          width="500px"
        >
          <form onSubmit={handleNewProduct}>
            <Input 
              placeholder="Product Name" 
              mb={4}
              required
              width="100%" // Make input stretch
              border="2px solid"
              borderColor="lightblue"
              color='black'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input 
              placeholder="Price" 
              mb={4}
              required
              width="100%" // Make input stretch
              border="2px solid"
              borderColor="lightblue"
              color='black'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input 
              placeholder="Image URL..." 
              mb={4}
              required
              width="100%" // Make input stretch
              border="2px solid"
              borderColor="lightblue"
              color='black'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <Button 
              colorScheme="blue" 
              type="submit" 
              width="100%" // Make button stretch
              color="black"
              bg="lightblue"
            >
              Add Product
            </Button>
          </form>
        </Box>
      </VStack>
    </Flex>
  );
};

export default CreateProduct;
