import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) 
  }
`;

export const VALIDATE_USER_MUTATION = gql`
  mutation validateUser($input: ValidateUserInput!) {
    validateUser(input: $input) 
  }
`;

export const CREATE_ITEM_MUTATION = gql`
  mutation createItem($input: CreateItemInput!) {
    createItem(input: $input) {
      id
    }
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation UpdateItem($input: UpdateItemInput!) {
    updateItem(input: $input) {
      id
    }
  }
`;

export const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(input: $id) 
  }
`;
