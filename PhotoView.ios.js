import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const pinWidth = 67/2,
      pinHeight = 84/2;

const styles = StyleSheet.create({
  pin:{
    width: 0,
    height: 0,
    backgroundColor:'red',
    // borderRadius: 5,
    position: 'absolute',
  },
  pinImage: {
    // resizeMode: 'cover',
    width: pinWidth,
    height: pinHeight,
    //compensate to center
    left:-pinWidth/2,
    top:-pinHeight,
  },
})

export default class PhotoView extends Component {
  state = {
    zoom: 1,
  }

  onScale(e){
    this.setState({zoom: e.nativeEvent.zoomScale});
  }

  renderPins(){
    const { pins, style, pinPress } = this.props;
    return pins.map((pin)=>{
      const location = pin.pin_location.split(',');
      const left     = style.width*location[0];
      const top      = style.height*location[1];
      return (
        <TouchableOpacity key={pin.id} style={[styles.pin, {left:left, top: top, transform:[{scale:1/this.state.zoom}]}]} onPress={()=>pinPress(pin)}>
          <Image source={{uri: pin.logo_file}} style={styles.pinImage} />
        </TouchableOpacity>
      );
    });
  }

  render() {
      return (
          <ScrollView
              contentContainerStyle={{ alignItems:'center', justifyContent:'center' }}
              centerContent={true}
              onScroll={(e)=>this.onScale(e)}
              scrollEventThrottle={200}
              maximumZoomScale={this.props.maximumZoomScale}
              minimumZoomScale={this.props.minimumZoomScale}>

              <TouchableWithoutFeedback
                  onPress={this.props.onTap ? this.props.onTap : function() {}}>

                  <Image {...this.props}>
                    {this.renderPins()}
                  </Image>

              </TouchableWithoutFeedback>

          </ScrollView>
      );
  }
}
