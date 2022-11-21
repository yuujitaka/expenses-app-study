import { FlatList } from "react-native";

import Item from "./Item";

const List = ({ expenses }) => {
  const renderExpenseItem = (itemData) => {
    return <Item expense={itemData.item} />;
  };

  return <FlatList data={expenses} renderItem={renderExpenseItem} />;
};

export default List;
