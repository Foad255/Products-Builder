import { Container ,VStack , Text, SimpleGrid} from '@chakra-ui/react';
import {Link} from 'react-router-dom'
import {useEffect} from 'react'
import {useProductStore} from './store/product.js'
import ProductCard from './ProductCard.jsx'

export default function Home() {
  const {fetchProducts, products} = useProductStore()
  useEffect(()=>{
    fetchProducts()
  },[fetchProducts])
  
    return(
      <Container maxW='container.x1' py="12">
        <VStack spacing={8}>
          <Text 
            fontSize="30px"
            fontWeight='bold'
             color="teal"
            textAlign="center"
          > Current Products 💣</Text>

          <SimpleGrid 
            columns={{base:1,md:2,lg:3}}
            spacing="10"
            W='full'
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>

        {products.length === 0 ?   <Text fontSize='x1' textAlign='center' fontWeight='bold' color='gray.500'>
            No products found 😥 {" "}
            <Text as='span'color="blue.500" _hover={{textDecoration: "underLine"}}>
             <Link to="/create">Create a product</Link>
            </Text>
          </Text> : ''}

        </VStack>
      </Container>
  )
}