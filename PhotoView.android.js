import React, {Component, PropTypes} from 'react';
import {requireNativeComponent, View} from 'react-native';

const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');

export default class PhotoView extends Component {

    static propTypes = {
        source: PropTypes.object,
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

    render() {
        var {pins, source, pinPress} = this.props;
        var nativeProps = {
            ...this.props,
            src: source.uri,
            pinPress: (e)=>{
              const id = e.nativeEvent.id;
              let pressedPin = pins.find((pin)=>{return pin.id === id});
              this.props.pinPress(pressedPin);
            },
        };

        return (
          <View style={{flex:1}}>
            <PhotoViewAndroid {...nativeProps} />
          </View>
        );
    }
}

var cfg = {
    nativeOnly: {
        src: true,
        loadingIndicatorSrc: true,
        shouldNotifyLoadEvents: true,
        pins: true
    }
};
const PhotoViewAndroid = requireNativeComponent('PhotoViewAndroid', PhotoView, cfg);
