import React from "react";
import Head from "next/head";
import {
  chakra,
  Icon,
  Button,
  VStack,
  HStack,
  Text,
  IconButton,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Box,
  SimpleGrid,
  useTab,
  useStyles,
  Link,
} from "@chakra-ui/react";
import Container from "../components/container";
import PageTransition from "../components/page-transitions";
import { getBooks } from "@/lib/airtable";
import Section from "@/components/section";
import Image from "next/image";
import BookCard from "@/components/book-card";
import { usePagination } from "react-use-pagination";
import BookSuggestion from "@/components/book-suggestion";
import { BookOpen, Heart } from "heroicons-react";
import sorter from "sort-isostring";

const Books = ({ books }) => {
  const StyledTab = chakra("button", { themeKey: "Tabs.Tab" });

  const CustomTab = React.forwardRef((props, ref) => {
    // 2. Reuse the `useTab` hook
    const tabProps = useTab(props);
    const isSelected = !!tabProps["aria-selected"];

    // 3. Hook into the Tabs `size`, `variant`, props
    const styles = useStyles();

    return (
      <StyledTab __css={styles.tab} {...tabProps}>
        {tabProps.children}
      </StyledTab>
    );
  });

  return (
    <PageTransition>
      <VStack spacing={8} py={16}>
        <Section>
          <VStack>
            <Heading as="h1">Books</Heading>
            <Text
              fontSize={["xl", "2xl"]}
              color={useColorModeValue("gray.500", "gray.200")}
              maxW="lg"
              textAlign="center"
            >
              Welcome to my book corner. Currently on my nightstand:{" "}
              <Link
                href="https://www.goodreads.com/book/show/50887097-why-fish-don-t-exist?ac=1&from_search=true&qid=oPyyw1DpGs&rank=1"
                textDecoration="underline"
              >
                Why Fish Don't Exist
              </Link>{" "}
              by Lulu Miller.
            </Text>
            <BookSuggestion />
          </VStack>
        </Section>
        <Section>
          <Tabs
            variant="soft-rounded"
            colorScheme="blue"
            align="center"
            w="100%"
          >
            <TabList>
              <Tab
                bg={useColorModeValue("gray.100", "gray.800")}
                color={useColorModeValue("gray.500", "gray.500")}
                _selected={{
                  color: "blue.800",
                  bg: "blue.100",
                }}
                mr={2}
              >
                <HStack spacing={1}>
                  <Icon as={BookOpen} />
                  <Text>All</Text>
                </HStack>
              </Tab>
              <Tab
                bg={useColorModeValue("gray.100", "gray.800")}
                color={useColorModeValue("gray.600", "gray.500")}
                _selected={{
                  color: "red.800",
                  bg: "red.100",
                }}
              >
                <HStack spacing={1}>
                  <Icon as={Heart} />
                  <Text>Favorites</Text>
                </HStack>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel px={0}>
                <SimpleGrid columns={[1, 2]} spacingY={8} spacingX={4} mt={8}>
                  {books
                    .filter((b) => b.fields.Read === true)
                    .sort((x, y) =>
                      sorter(y.fields["Date Read"], x.fields["Date Read"])
                    )
                    .map((book) => (
                      <BookCard
                        key={book.id}
                        title={book.fields.Title}
                        author={book.fields.Author}
                        rating={book.fields.Rating}
                        isFavorite={book.fields.Favorite}
                        cover={book.fields.Cover}
                        dateRead={book.fields["Date Read"]}
                      />
                    ))}
                </SimpleGrid>
              </TabPanel>
              <TabPanel px={0}>
                <SimpleGrid columns={[1, 2]} spacingY={8} spacingX={4} mt={8}>
                  {books
                    .filter((b) => b.fields.Favorite == true)
                    .sort((x, y) =>
                      sorter(y.fields["Date Read"], x.fields["Date Read"])
                    )
                    .map((book) => (
                      <BookCard
                        key={book.id}
                        title={book.fields.Title}
                        author={book.fields.Author}
                        rating={book.fields.Rating}
                        isFavorite={book.fields.Favorite}
                        cover={book.fields.Cover}
                        dateRead={book.fields["Date Read"]}
                      />
                    ))}
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Section>
      </VStack>
    </PageTransition>
  );
};

export async function getStaticProps() {
  const books = await getBooks();

  return {
    props: {
      books,
    },
  };
}

export default Books;