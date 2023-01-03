import React, { useEffect } from "react";
import { useAccount } from "../../hooks/useAccount";
import { useLazyQuery } from "@apollo/client";

import { GET_ITEMS_QUERY } from '../../../graphql';
import {
  ITEM_CREATED_SUBSCRIPTION,
  ITEM_UPDATED_SUBSCRIPTION,
  ITEM_DELETED_SUBSCRIPTION,
} from '../../../graphql';

import DataTable from "../../../components/DataTable";

import "../../../css/AccountMainPage.css";

const AccountMainPage = () => {
  const { me, accountData, setAccountData } = useAccount();

  const [ renderItem ,{
    loading, error, data: itemsData, subscribeToMore,
  }] = useLazyQuery(GET_ITEMS_QUERY, {
    variables:{ username: me }
  });


  useEffect(
    () => {
      subscribeToMore({
        document: ITEM_CREATED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const item = subscriptionData.data.itemCreated;
          return {
            items: [item, ...prev.items],
          };
        },
      });
    },
    [subscribeToMore],
  );

  useEffect(
    () => {
      subscribeToMore({
        document: ITEM_UPDATED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const updatedItem = subscriptionData.data.itemUpdated;
          return {
            items: prev.items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
          };
        },
      });
    },
    [subscribeToMore],
  );
  
  useEffect(
    () => {
      subscribeToMore({
        document: ITEM_DELETED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          console.log(prev.items)
          console.log(subscriptionData.data.itemDeleted)
          return {
            items: prev.items.filter((item) => (item.id !== subscriptionData.data.itemDeleted))
          };
        },
      });
    },
    [subscribeToMore],
  );

  useEffect(() => {
    renderItem(me)
    if (itemsData === undefined) return;
    const { items } = itemsData;
    console.log(items)
    const sortedItems = items.slice().sort((a, b) => b.time - a.time);
    if (sortedItems !== undefined) setAccountData(sortedItems)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ me, itemsData])

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return (<h1>Error :(</h1>);
  }

  return (
    <div>
      <DataTable title={"Your Recent Data"} data={accountData} />
    </div>
  );
};
export default AccountMainPage;
