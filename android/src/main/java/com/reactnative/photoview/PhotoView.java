package com.reactnative.photoview;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.PointF;
import android.os.AsyncTask;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;

import com.davemorrissey.labs.subscaleview.SubsamplingScaleImageView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.events.EventDispatcher;

import java.io.InputStream;
import java.util.ArrayList;

public class PhotoView extends SubsamplingScaleImageView {
    private ArrayList<MarkerPin> oPin;
    private ArrayList<MarkerPin> sPin;

    public PhotoView(Context context) {
        this(context, null);
    }

    public PhotoView(Context context, AttributeSet attr) {
        super(context, attr);
        oPin = new ArrayList<MarkerPin>();
        sPin = new ArrayList<MarkerPin>();
    }

    public void setPins(ReadableArray source){
        for (int i = 0; i < source.size(); i++){
            ReadableMap map = source.getMap(i);
            MarkerPin mp = new MarkerPin();
            mp.id = map.getInt("id");
            mp.name = map.getString("name");
            mp.url = map.getString("logo_file");
            String[] location = map.getString("pin_location").split(",");

            mp.point = new PointF(
                    Float.parseFloat(location[0]),
                    Float.parseFloat(location[1])
            );

            oPin.add(mp);

            new DownloadImageTask().execute(mp);
        }
    }

    @Override
    protected void onImageLoaded() {
        super.onImageLoaded();

        for (int i = 0; i < oPin.size(); i++){
            MarkerPin sp = oPin.get(i);
            sp.point.set(sp.point.x*getSWidth(), sp.point.y*getSHeight());
            sPin.add(sp);
            if(sp.icon != null) {
                invalidate();
            }
        }

        resetPins();

        final EventDispatcher eventDispatcher = ((ReactContext) getContext())
                .getNativeModule(UIManagerModule.class).getEventDispatcher();

        eventDispatcher.dispatchEvent(
                new ImageEvent(getId(), ImageEvent.ON_LOAD_END)
        );
    }

    protected void resetPins(){
        final EventDispatcher eventDispatcher = ((ReactContext) getContext())
                .getNativeModule(UIManagerModule.class).getEventDispatcher();

        setOnTouchListener(new OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent e) {
                PointF sCoord = viewToSourceCoord(e.getX(), e.getY());
                for(int i = 0; i < sPin.size(); i++) {
                    MarkerPin pin = sPin.get(i);
                    PointF pCoord = pin.point;

                    float pWidth = pin.icon.getWidth();
                    float pHeight = pin.icon.getHeight();

                    if (sCoord.x > pCoord.x - (pWidth / 2) && sCoord.x < pCoord.x + (pWidth / 2) &&
                            sCoord.y > pCoord.y - pHeight && sCoord.y < pCoord.y) {
                        Log.d("YEah!", "clicked pin!");
                        WritableMap pinmap = Arguments.createMap();
                        pinmap.putInt("id", pin.id);
                        eventDispatcher.dispatchEvent(
                                new ImageEvent(getId(), ImageEvent.ON_PIN).setExtras(pinmap)
                        );
                    }
                }
                return false;
            }
        });

    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        // Don't draw pin before image is ready so it doesn't move around during setup.
        if (!isReady()) {
            return;
        }

        Paint paint = new Paint();
        paint.setAntiAlias(true);

        if (sPin != null) {
            for (int i = 0; i < sPin.size(); i++) {
                MarkerPin mp = sPin.get(i);
                if(mp.icon != null) {
                    PointF vPin = sourceToViewCoord(mp.point);
                    float vX = vPin.x - (mp.icon.getWidth() / 2);
                    float vY = vPin.y - mp.icon.getHeight();
                    canvas.drawBitmap(mp.icon, vX, vY, paint);
                }
            }
        }else{
            Log.i("INFO","no pins??");
        }

    }

    class MarkerPin{
        public int id;
        public String name;
        public PointF point;
        public String url;
        public Bitmap icon;
    }

    class DownloadImageTask extends AsyncTask<MarkerPin, Void, Bitmap> {
        public MarkerPin pin;
        protected Bitmap doInBackground(MarkerPin... pins) {
            pin = pins[0];
            String urldisplay = pin.url;
            Bitmap icon = null;
            try {
                InputStream in = new java.net.URL(urldisplay).openStream();
                icon = BitmapFactory.decodeStream(in);
            } catch (Exception e) {
                Log.e("Error", e.getMessage());
                e.printStackTrace();
            }

            return icon;
        }

        protected void onPostExecute(Bitmap result) {
            float density = getResources().getDisplayMetrics().densityDpi;
            float w = (density/420f) * result.getWidth();
            float h = (density/420f) * result.getHeight();
            result = Bitmap.createScaledBitmap(result, (int)w, (int)h, true);
            pin.icon = result;
            invalidate();
        }
    }
}