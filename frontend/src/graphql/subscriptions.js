import { gql } from "@apollo/client";

export const ITEM_CREATED_SUBSCRIPTION = gql`
  subscription ItemCreated {
    itemCreated {
      id
      username
      name
      money
      category
      subCategory
      time
      description
    }
  }
`;

export const ITEM_UPDATED_SUBSCRIPTION = gql`
  subscription ItemUpdated {
    itemUpdated {
      id
      username
      name
      money
      category
      subCategory
      time
      description
    }
  }
`;

export const ITEM_DELETED_SUBSCRIPTION = gql`
  subscription ItemUpdated {
    itemDeleted
  }
`;

export const CATEGORY_ADDED_SUBSCRIPTION = gql`
  subscription CategoryAdded {
    categoryAdded {
      categories {
        cat
        subcat
      }
    }
  }
`;
