import React, {Component, PropTypes} from 'react';
import {requireNativeComponent, View, TouchableOpacity, Image, StyleSheet} from 'react-native';

const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');

const styles = StyleSheet.create({
  pin:{
    width: 30,
    height: 30,
    borderRadius: 5,
    position: 'absolute',
    backgroundColor: 'red',
  },
  pinImage: {
    resizeMode: 'cover',
    width: 30,
    height: 30,
    //compensate to center
    marginLeft: -15,
    marginTop: -15,
  }
})

export default class PhotoView extends Component {
    state = {
      zoom: 1,
    }

    static propTypes = {
        source: PropTypes.oneOfType([
            PropTypes.shape({
                uri: PropTypes.string
            }),
            // Opaque type returned by require('./image.jpg')
            PropTypes.number
        ]),
        loadingIndicatorSource: PropTypes.oneOfType([
            PropTypes.shape({
                uri: PropTypes.string
            }),
            // Opaque type returned by require('./image.jpg')
            PropTypes.number
        ]),
        fadeDuration: PropTypes.number,
        minimumZoomScale: PropTypes.number,
        maximumZoomScale: PropTypes.number,
        scale: PropTypes.number,
        androidZoomTransitionDuration: PropTypes.number,
        androidScaleType: PropTypes.oneOf(["center", "centerCrop", "centerInside", "fitCenter", "fitStart", "fitEnd", "fitXY", "matrix"]),
        onLoadStart: PropTypes.func,
        onLoad: PropTypes.func,
        onLoadEnd: PropTypes.func,
        onTap: PropTypes.func,
        onViewTap: PropTypes.func,
        onScale: PropTypes.func,
        ...View.propTypes
    };

    onZoomPanChange(e){
      console.log(e.nativeEvent);
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
        const source = resolveAssetSource(this.props.source);
        var loadingIndicatorSource = resolveAssetSource(this.props.loadingIndicatorSource);

        if (source && source.uri === '') {
            console.warn('source.uri should not be an empty string');
        }

        if (this.props.src) {
            console.warn('The <PhotoView> component requires a `source` property rather than `src`.');
        }

        if (source && source.uri) {
            var {onLoadStart, onLoad, onLoadEnd} = this.props;
            // this.props.onScale = (e)=>this.onZoomPanChange(e);
            var nativeProps = {
                ...this.props,
                onScale: (e)=>{console.log(this.refs.pv); this.onZoomPanChange(e)},
                shouldNotifyLoadEvents: !!(onLoadStart || onLoad || onLoadEnd),
                src: source.uri,
                loadingIndicatorSrc: loadingIndicatorSource ? loadingIndicatorSource.uri : null,
            };

            return (
              <View style={{flex:1, backgroundColor:'blue'}}>
                <PhotoViewAndroid ref="pv" {...nativeProps} />
                {this.renderPins()}
              </View>
            );
        }
        return null
    }
}

var cfg = {
    nativeOnly: {
        src: true,
        loadingIndicatorSrc: true,
        shouldNotifyLoadEvents: true
    }
};
const PhotoViewAndroid = requireNativeComponent('PhotoViewAndroid', PhotoView, cfg);
