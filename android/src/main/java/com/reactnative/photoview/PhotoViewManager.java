package com.reactnative.photoview;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.util.Log;

import com.davemorrissey.labs.subscaleview.ImageSource;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import javax.annotation.Nullable;

import java.io.InputStream;
import java.util.Map;

/**
 * @author alwx (https://github.com/alwx)
 * @version 1.0
 */
public class PhotoViewManager extends SimpleViewManager<PhotoView> {
    private static final String REACT_CLASS = "PhotoViewAndroid";
    private PhotoView viewInstance;

    PhotoViewManager(ReactApplicationContext context) {

    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected PhotoView createViewInstance(ThemedReactContext reactContext) {
        final PhotoView imageView = new PhotoView(reactContext);
        viewInstance = imageView;
        return imageView;
    }

    @ReactProp(name = "src")
    public void setSource(PhotoView view, @Nullable String source) {
        new DownloadImageTask().execute(source);
    }

    @ReactProp(name = "pins")
    public void setPins(PhotoView view, @Nullable ReadableArray source) {
        view.setPins(source);
    }

    @ReactProp(name = "loadingIndicatorSrc")
    public void setLoadingIndicatorSource(PhotoView view, @Nullable String source) {
//        view.setLoadingIndicatorSource(source, mResourceDrawableIdHelper);
    }

    @ReactProp(name = "fadeDuration")
    public void setFadeDuration(PhotoView view, int durationMs) {
//        view.setFadeDuration(durationMs);
    }

    @ReactProp(name = "shouldNotifyLoadEvents")
    public void setLoadHandlersRegistered(PhotoView view, boolean shouldNotifyLoadEvents) {
//        view.setShouldNotifyLoadEvents(shouldNotifyLoadEvents);
    }

    @ReactProp(name = "minimumZoomScale")
    public void setMinimumZoomScale(PhotoView view, float minimumZoomScale) {
//        view.setMinimumScale(minimumZoomScale);
    }

    @ReactProp(name = "maximumZoomScale")
    public void setMaximumZoomScale(PhotoView view, float maximumZoomScale) {
//        view.setMaximumScale(maximumZoomScale);
    }

    @ReactProp(name = "scale")
    public void setScale(PhotoView view, float scale) {
//        view.setScale(scale, true);
    }

    @ReactProp(name = "androidZoomTransitionDuration")
    public void setScale(PhotoView view, int durationMs) {
//        view.setZoomTransitionDuration(durationMs);
    }

    @ReactProp(name = "androidScaleType")
    public void setScaleType(PhotoView view, String scaleType) {

    }

    @Override
    public @Nullable
    Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                ImageEvent.eventNameForType(ImageEvent.ON_PIN), MapBuilder.of("registrationName", "pinPress"),
                ImageEvent.eventNameForType(ImageEvent.ON_LOAD_END), MapBuilder.of("registrationName", "onLoadEnd")
        );
    }

    @Override
    protected void onAfterUpdateTransaction(PhotoView view) {
        super.onAfterUpdateTransaction(view);
    }


    class DownloadImageTask extends AsyncTask<String, Void, Bitmap> {
        protected Bitmap doInBackground(String... urls) {
            String urldisplay = urls[0];
            Bitmap mIcon11 = null;
            try {
                InputStream in = new java.net.URL(urldisplay).openStream();
                mIcon11 = BitmapFactory.decodeStream(in);
            } catch (Exception e) {
                Log.e("Error", e.getMessage());
                e.printStackTrace();
            }
            return mIcon11;
        }

        protected void onPostExecute(Bitmap result) {
            viewInstance.setImage(ImageSource.bitmap(result));
        }
    }
}
