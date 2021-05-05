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
import { useState } from 'react';
import { MMKV } from 'react-native-mmkv';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

function Gallery() {
    const [slideList , setSlideList] = useState([]);
    const getFiles = async () =>{
      let idUsuario = MMKV.getNumber('idUsuario');

      let date = new Date().getDate();
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
  
      let currentDate = date + '-' + month + '-' + year;

      let response = await service.getFiles(idUsuario , currentDate)

      if(response.length != 0){
        setSlideList(response.map((pathFile) => {
          let regexNameUbicacion = /[/].+[/](.*)/;
          let fileName = pathFile.match(regexNameUbicacion)[1];

          let file = {
            url : 'http://geoplanningmas.com/ar/v2/apifiles/' + pathFile,
            fileName : fileName
          };

          return file;
        }));
      }
    }
    useEffect(() => {
      getFiles();
    },[]);

    return (
      <View style={{flex: 1 }}> 
      {console.log(slideList)}  
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
          source={{ uri: data.url }}
          style={{ marginTop: '5%' , width: windowWidth * 0.9, height: windowHeight * 0.7}}
        ></Image>
        {/* } */}
        <Text style={{ fontSize: 24 }}>{data.fileName}</Text>
      </View>
    );
}
export default Gallery;