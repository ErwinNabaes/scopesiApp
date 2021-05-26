package com.appmobile.keyeventlister;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContext;

public class KeyEventListerModule extends ReactContextBaseJavaModule{
    private ReactApplicationContext mContext;
    KeyEventListerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }


    @Override
    public String getName() {
        return "KeyEventLister";
    }

    // volume key switch (RN provides a way for the end use)
    @ReactMethod
    public void audioSwitch(final Boolean isLister) {
      getCurrentActivity().runOnUiThread(new Runnable() {
        @Override
        public void run() {
          Intent intent = new Intent();
          intent.putExtra("isLister", isLister); // add parameters broadcast transmission
          intent.setAction("com.appmobile.volume"); // need to fill out a registration with the same broadcast
          // send broadcast
          getCurrentActivity().sendBroadcast(intent);
        }
      });
    }
}
