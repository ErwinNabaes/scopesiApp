import React, {useEffect} from 'react';
import * as service from '../utils/serviceManager';
import Video from 'react-native-video';
import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { useState } from 'react/cjs/react.development';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

function Gallery() {
    const [slideList , setSlideList] = useState([]);
    const getFiles = async () =>{
      let response = await service.getFiles(25 , 43673)

      if(response.length != 0){
        setSlideList(response.map((file) => {
          return file;
        }));
      }
    }
    useEffect(() => {
      getFiles();
    },[]);

    return (
      <View style={{flex: 1 }}>   
        {slideList.length != 0 ?
          <FlatList
            data={slideList}
          
            renderItem={({ item }) => {
              return <Slide data={item} />;
            }}
            keyExtractor={(item, index) => index.toString()}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        :
          <Text>No hay imagenes subidas</Text>
        }
      </View>
    );
}

function Slide({ data }) {
    return (
      <View
        style={{
          height: windowHeight,
          width: windowWidth,
          alignItems: "center",
          backgroundColor:'#343a40'
        }}
      >
        {/* {data.extension === 'mp4'  
        ?
        <Video
        source={{ uri: data.fileDownloadUri }}
        style={{ marginTop: '5%' , width: windowWidth * 0.9, height: windowHeight * 0.7}}
        controls={true}
        resizeMode='cover'
        paused={true}
        />
        : */}
        <Image
          source={{ uri: data.fileDownloadUri }}
          style={{ marginTop: '5%' , width: windowWidth * 0.9, height: windowHeight * 0.7}}
        ></Image>
        {/* } */}
        <Text style={{ fontSize: 24 }}>{data.name}</Text>
      </View>
    );
}
export default Gallery;