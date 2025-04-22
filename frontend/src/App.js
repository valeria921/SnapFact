import './App.css';
import { useEffect, useState } from 'react';
import { Dropdown } from './components/Dropdown';
import { ButtonGet } from './components/ButtonGet';
import { getCategoryList, getRandomFactByCategory } from './apis';
import { FactView } from './components/FactView';
import { Flex, Box, Image, Text, Link } from '@chakra-ui/react';

function App() {
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [fact, setFact] = useState({});
  const isButtonDisabled = categoryId === 0;

  useEffect(() => {
    setTimeout(fetchCategoryList, 500);
  }, []);

  function fetchCategoryList() {
    getCategoryList()
      .then((response) => {
        setCategoryList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function fetchRandomFact() {
    if (!categoryId) {
      alert('Please select a category first!');
      return;
    }
    getRandomFactByCategory(categoryId).then((response) => {
      console.log(response.data);
      setFact(response.data);
    });
  }

  return (
    <Box>
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Box
          flex="1"
          mt={{ base: '12', md: '16', lg: '28' }}
          ml={{ base: '12', md: '20', lg: '32' }}
          mr={{ base: '12', md: '0' }}
        >
          <Text
            color="#283237"
            fontSize={{ base: '2xl', md: '4xl', lg: '6xl' }}
            lineHeight="1.2"
            mb="4"
            fontFamily="'Verdana', sans-serif"
            fontWeight="semibold"
            letterSpacing="-0.03em"
          >
            You will never Google this
          </Text>
          <Text
            color="#283237"
            fontSize={{ base: 'xs', md: 'md', lg: 'lg' }}
            lineHeight="1.4"
            mb="6"
            fontFamily="'Montserrat', sans-serif"
            letterSpacing="-0.01em"
          >
            You weren’t planning to learn something totally random today, but...
            <br />
            Here you are, about to discover a fact so weird it’ll stick in your brain forever.
          </Text>
          <Flex mb="6" gap="5%" flexDirection={{ base: 'column', md: 'row' }}>
            <Box width={{ base: '60%', md: '65%', lg: '50%' }} mb="2">
              <Dropdown list={categoryList} onItemSelect={(id) => setCategoryId(id)} />
            </Box>
            <Box width={{ base: '60%', md: '25%' }}>
              <ButtonGet
                text="Get Fact"
                onClickCalledOutside={fetchRandomFact}
                disabled={isButtonDisabled}
              />
            </Box>
          </Flex>
          <FactView fact_title={fact.fact_title} fact_text={fact.fact_text} />
        </Box>
        <Box flex="1" display={{ base: 'none', md: 'block' }}>
          <Image
            src="/images/main.svg"
            alt="Girl with laptop"
            style={{ transform: 'scaleX(-1)' }}
            mt={{ base: '0', md: '4', lg: '0' }}
            mr={{ base: '0', md: '12', lg: '20' }}
            width={{ base: '40%', md: '90%' }}
            height="auto"
            align="center"
          />
        </Box>
      </Flex>
      <Box
        as="footer"
        width="100%"
        textAlign="center"
        fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}
        mt="8"
      >
        <Flex
          justify="center"
          ml={{ base: '12', md: '0' }}
          gap={{ base: '2', md: '6' }}
          wrap="wrap"
          direction={{ base: 'column', md: 'row' }}
        >
          <Link
            href="https://www.linkedin.com/in/valeria-kruk"
            isExternal
            target="_blank"
            color="#495963"
            fontFamily="'Montserrat', sans-serif"
            letterSpacing="-0.01em"
            _hover={{ textDecoration: 'underline' }}
          >
            🔗 Find me on LinkedIn
          </Link>
          <Link
            href="https://github.com/valeria921/SnapFact"
            isExternal
            target="_blank"
            color="#495963"
            fontFamily="'Montserrat', sans-serif"
            letterSpacing="-0.01em"
            _hover={{ textDecoration: 'underline' }}
          >
            🛠 View Source on GitHub
          </Link>
        </Flex>
      </Box>
    </Box>
  );
}

export default App;
