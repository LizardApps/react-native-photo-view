/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import PhotoView from './react-native-photo-view/PhotoView';

const pins = [{
  id: 105,
  pin_location: '0.6680338584571401,0.19389914188315505',
  name: 'Burger King',
  logo_file: 'http://42.156.33.86/images/poi_logo_file_105.jpg',
},{
  id: 106,
  pin_location: '0.38584571401,0.89914188315505',
  name: 'Burger King',
  logo_file: 'http://42.156.33.86/images/poi_logo_file_105.jpg',
},{
  id: 107,
  pin_location: '0.571401,0.315505',
  name: 'Burger King',
  logo_file: 'http://42.156.33.86/images/poi_logo_file_105.jpg',
}]

const width = 300,
      height = 300;

export default class PanZoom extends Component {
  state = {
    zoomScale: 1,
    contentOffset: {x:0, y:0 },
  }

  renderPins(){
    return pins.map((pin)=>{
      const location = pin.pin_location.split(',');
      const left = width*location[0] * this.state.zoomScale - this.state.contentOffset.x;
      const top = height*location[1] * this.state.zoomScale - this.state.contentOffset.y;
      return (
        <TouchableOpacity key={pin.id} style={[styles.pin, {left:left, top: top}]}>
          <Image source={{uri: pin.logo_file}} style={styles.pinImage} />
        </TouchableOpacity>
      );
    });
  }

  updateMarkers(e){
    // console.log(e.nativeEvent);
    const { zoomScale, contentOffset } = e.nativeEvent;
    this.setState({ zoomScale, contentOffset });
    // console.log(this.state);
  }

  render() {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <View style={{width:width, height: height, overflow: 'hidden'}}>
          <PhotoView
            source={{uri: 'http://42.156.33.86/images/maps_maps_image_42.jpg'}}
            minimumZoomScale={this.state.zoomScale}
            maximumZoomScale={10}
            androidScaleType="center"
            onScale={(e)=>this.updateMarkers(e)}
            onLoad={() => console.log("Image loaded!")}
            style={{width: width, height: height}} />
          {this.renderPins()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pin:{
    width: 20,
    height: 20,
    borderRadius: 5,
    position: 'absolute',
  },
  pinImage: {
    resizeMode: 'cover',
    width: 20,
    height: 20,
    //compensate to center
    marginLeft: -10,
    marginTop: 10,
  }
})

AppRegistry.registerComponent('PanZoom', () => PanZoom);
