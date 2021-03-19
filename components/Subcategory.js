import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import RenderSubCategoryItems from "./RenderSubCategoryItems";
import RenderItem from './RenderItem';

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

// const renderScreen = () => (
//     <RenderItem />
//   // <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
// );

export default function Subcategory({ route }) {
  
  // console.log(route.params.category.subCategory);
  const [index, setIndex] = React.useState(0);
  // const [routes, setroutes] = useState([]);
  const [screens, setscreens] = useState({});
  console.log("hello");
  
  // console.log(route.params);
  const { category } = route.params;
  const { name } = route.params;
  const { subCategory } = category;
  // const {subCategories} = route.params.category;
  // console.log(subCategory);
  
  // console.log(category);
  // const subCategories = category.subCategory;
  // console.log(subCategories[0]);
  const layout = useWindowDimensions();
  
  const temp = [];
  const debora = subCategory.forEach(route=>{
    // console.log(route);
    const data = { key: route.toLowerCase(), title: route.toUpperCase() }
    // console.log(data);
    temp.push(data);
    
  })
  // console.log(temp);
  // setroutes(temp);
  // console.log(routes);
  const obj = {};
  // const deboraBanda = temp.forEach(route=>{
  //   const data = route + ':' + renderScreen(route);
  //   obj.route = renderScreen(route.key);
  // }) 
  // console.log(arr);
  // console.log(routes);  
  // console.log(screens);

  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute />;
      case 'second':
        return <RenderSubCategoryItems itemName={name} />;
      default:
        return null;
    }
  };

  // const renderScene = SceneMap({
  //   first: FirstRoute,
  //   second: renderScreen
  // });
  // console.log(obj);

  // const renderScene = SceneMap ({
  //   first: FirstRoute,
  //   second: SecondRoute
  // })

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}