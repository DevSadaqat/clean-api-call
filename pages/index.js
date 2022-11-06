import React, { useEffect } from "react";
import axios from "axios";
import useApi from "../hooks/useApi";

import {
  ListItem,
  UnorderedList,
  Container,
  Heading,
  Spinner,
  Text
} from '@chakra-ui/react'

const getPosts = () => axios.get("https://jsonplaceholder.typicode.com/posts");
const getComments = () => 
  axios.get("https://jsonplaceholder.typicode.com/comments");

export default function Home() {
  const getPostsApi = useApi(getPosts);
  const getCommentsApi = useApi(getComments);

  useEffect(() => {
    getPostsApi.request();
    getCommentsApi.request();
  }, []);


  return (
    <Container m={[2, 3]} p={4} maxW='550px' centerContent>
      {/* Posts */}
      <Heading as='h4' size='md'>Posts</Heading>
      {getPostsApi.loading ? <Spinner color='red.500' />
      : null}
      {getPostsApi.error ?  <Text fontSize='lg'>{getPostsApi.error}</Text>
      : null}
      <UnorderedList>
        {getPostsApi.data?.map((post) => (
          <ListItem key={post.id}>{post.title}</ListItem>
        ))}
      </UnorderedList>
      {/* Comment List  */}
      <Heading as='h4' size='md'>Comment List</Heading>
      {getCommentsApi.loading ? <Spinner color='red.500' />
      : null}
      {getCommentsApi.error ?  <Text fontSize='lg'>{getCommentsApi.error}</Text>
      : null}
      <UnorderedList>
        {getCommentsApi.data?.map((comment) => (
          <ListItem key={comment.id}>{comment.name}</ListItem>
        ))}
      </UnorderedList>
  </Container>
  )
}
