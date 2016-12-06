/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Dimensions,
} from 'react-native';
import PhotoView from './react-native-photo-view/PhotoView';

const { width, height } = Dimensions.get('window');

const pins = [{
  id: 105,
  pin_location: '0.6680338584571401,0.19389914188315505',
  name: 'Burger King 1',
  logo_file: 'http://42.156.33.86/images/poi_logo_file_105.jpg',
},{
  id: 106,
  pin_location: '0.38584571401,0.89914188315505',
  name: 'Burger King 2',
  logo_file: 'http://42.156.33.86/images/poi_logo_file_105.jpg',
},{
  id: 107,
  pin_location: '0.571401,0.315505',
  name: 'Burger King 3',
  logo_file: 'http://42.156.33.86/images/poi_logo_file_105.jpg',
}];

export default class PanZoom extends Component {
  onPinPress(pin){
    console.log(pin.name +" pressed");
  }
  render() {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <View style={{width:width, height: height, overflow: 'hidden'}}>
          <PhotoView
            pins={pins}
            pinPress={this.onPinPress}
            source={{uri: 'http://42.156.33.86/images/maps_maps_image_42.jpg'}}
            minimumZoomScale={.5}
            maximumZoomScale={10}
            androidScaleType="center"
            style={{width: width, height: height}} />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('PanZoom', () => PanZoom);
