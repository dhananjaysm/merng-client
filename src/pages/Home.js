import React, { useContext } from "react";
import { useQuery  } from "@apollo/client";

import { Grid ,Transition} from "semantic-ui-react";
import {gql} from 'graphql-tag'
 import { AuthContext } from "../context/auth.js";
import PostCard from "../components/PostCard.js";
import PostForm from "../components/PostForm.js";
import { FETCH_POSTS_QUERY } from "../utils/graphql.js";

function Home() {
  const {user } = useContext(AuthContext)
  const { loading ,data , error } = useQuery(FETCH_POSTS_QUERY);
 
  if (error) return `Error! ${error.message}`;
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (<h1>Loading posts...</h1>) 
        : (
          <Transition.Group>{
            data.getPosts &&
            data.getPosts.map((post) => (
              <Grid.Column key={post.id} style= {{ marginBottom: 20}}>
                <PostCard post={post} />
              </Grid.Column>
            ))
            
            }</Transition.Group>
        
        )}
      </Grid.Row>
    </Grid>
  );
}



export default Home;
