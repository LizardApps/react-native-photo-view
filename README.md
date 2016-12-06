# react-native-photo-view

Provides custom Image view for React Native that allows to perform
pinch-to-zoom on images. Works on both iOS and Android.

This component uses [PhotoDraweeView](https://github.com/ongakuer/PhotoDraweeView) for Android and native
Scroll + Image approach on iOS.

## Usage

```javascript
import PhotoView from 'react-native-photo-view';
```

Basics:
```javascript
const pins = [{
  id: 105,
  pin_location: '0.6680338584571401,0.19389914188315505',
  name: 'pin1',
  logo_file: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=wavatar&f=y',
},{
  id: 106,
  pin_location: '0.38584571401,0.89914188315505',
  name: 'pin2',
  logo_file: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=retro&f=y',
},{
  id: 107,
  pin_location: '0.571401,0.315505',
  name: 'pin3',
  logo_file: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=monsterid&f=y',
}];

...

<PhotoView
  pins={pins}
  source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
  minimumZoomScale={0.5}
  maximumZoomScale={3}
  androidScaleType="center"
  pinPress={(pin) => console.log(pin)}
  onLoad={() => console.log("Image loaded!")}
  style={{width: 300, height: 300}} />
```

## Properties

| Property | Type | Description |
|-----------------|----------|--------------------------------------------------------------|
| pins | Array | list of objects with minimum id, relative location and image  |
| source | Object | same as source for other React images |
| loadingIndicatorSource | Object | source for loading indicator |
| fadeDuration | int | duration of image fade (in ms) |
| minimumZoomScale | float | The minimum allowed zoom scale. The default value is 1.0 |
| maximumZoomScale | float | The maximum allowed zoom scale. The default value is 3.0 |
| scale | float | Set zoom scale programmatically |
androidZoomTransitionDuration | int | **Android only**: Double-tap zoom transition duration |
| androidScaleType | String | **Android only**: One of the default *Android* scale types: "center", "centerCrop", "centerInside", "fitCenter", "fitStart", "fitEnd", "fitXY" |
| pinPress | func | Callback function taking the pressed pin as an argument |
| onLoadStart | func | Callback function |
| onLoad | func | Callback function |
| onLoadEnd | func | Callback function |
| onTap | func | Callback function (called on image tap) |
| onViewTap | func | Callback function (called on tap outside of image). Currently **Android only** (will be available for iOS later) |
| onScale | func | Callback function. Currently **Android only** (will be available for iOS later) |

## Compared to [react-native-image-zoom](https://github.com/Anthonyzou/react-native-image-zoom)

react-native-image-zoom functionality is similar, but there are several major differencies:

* PhotoView is based on PhotoDraweeView which is the "PhotoView For Fresco". It works better, it supports several
important callbacks out-of-box and it is, actually, recommended by Chris Banes, because his
[PhotoView](https://github.com/chrisbanes/PhotoView) (base for react-native-image-zoom) doesn't completely
support Facebook Fresco;
* PhotoView has more options like fadeDuration and minimumZoomScale/maximumZoomScale and more important callbacks;
* PhotoView is written in the same manner as default React Image, and it supports most of the
features Image has (the goal is to be fully compaitable with Image and support absolutely everything);
* It is possible to use PhotoView as a container (currently iOS only)!

## Automatic installation

Just two simple steps:
```
npm install --save react-native-photo-view@1.2.0
```
```
rnpm link react-native-photo-view
```

## Manual installation

1. Add these lines to `android/settings.gradle`
```
include ':react-native-photo-view'
project(':react-native-photo-view').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-photo-view/android')
```

2. Add one more dependency to `android/app/build.gradle`
```
dependencies {
    compile project(':react-native-photo-view')
}
```

3. Add it to your `MainActivity.java`

Next, you need to change the `MainActivity` of your app to register `PhotoViewPackage` :
```java
import com.reactnative.photoview.PhotoViewPackage;

// ...

public class MainActivity extends ReactActivity {
    // ...

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new PhotoViewPackage() // add this manager
      );
    }

    // ...
}
```
