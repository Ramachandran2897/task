import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import store from "../redux/store";
import { Add_Data, Remove_Data } from "../redux/selectedData/type";

const ListingScreen = (props) => {
  console.log(props.listData);
  const [data, setData] = useState([]);
  const [listerrorValues, setListerrorvalues] = useState(false);
  const [loadMoreDataCount, setLoadMoreDataCount] = useState(2);
  useFocusEffect(
    useCallback(() => {
      axios
        .get("")
        .then((res) => {
          let newData = res.data?.results.map((obj, index) => ({
            ...obj,
            id: index + 1,
          }))
          setData(newData);
          console.log(newData);
        })
        .catch((error) => {});
    }, [])
  );
  useEffect(() => {
    if (props.listData.length > 0) {
      let updatedStar = data.map((obj) => props.listData.includes({id: obj.id}) ? {...obj, star: true} :  {...obj, star: false})
    //   console.log(updatedStar)
      setData(updatedStar)
    }
  }, [props.listData]);
  const loadMoreData = () => {
    axios.get(`?page=${loadMoreDataCount}`).then((res) => {
      let newData = res.data?.results.map((obj, index) => ({
        ...obj,
        id: loadMoreDataCount * 10-9+index,
      }))
      setData([...data, ...newData]);
      setLoadMoreDataCount(loadMoreDataCount + 1);
    })
      .catch((error) => {
        setListerrorvalues(true);
      });
    console.log("loadmore", loadMoreDataCount);
  };
  const Item = ({ title, id, star }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => props.navigation.navigate("ViewScreen", { itemId: id })}
    >
      <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={() =>
            store.dispatch({
              type: Add_Data,
              payload: [...props.listData, { id: id }],
            })
          }
        >
          <AntDesign
            name={ star ? "star" : "staro"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => <Item title={item.name} id={item.id} star={item.star} />;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={10}
        onEndReached={!listerrorValues && loadMoreData}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  item: {
    backgroundColor: "#edededed",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 14,
  },
});
const mapStateToProps = (state) => {
  return {
    listData: state.listData,
  };
};
export default connect(mapStateToProps, null)(ListingScreen);
