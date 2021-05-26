package com.appmobile;

import com.facebook.react.ReactActivity;
//import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.BroadcastReceiver;
import android.content.res.Configuration;
import android.view.WindowManager;
import android.view.KeyEvent;
import androidx.annotation.Nullable;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactMethod;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "appMobile";
  }

  private NetworkChangeReceiver networkChangeReceiver;
  /*
 * IsLister volume key control switch
 * True --- Volume key system volume can not be adjusted
 * Flase --- Volume keys to adjust the system volume
*/
  Boolean isLister = false;

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
      super.onConfigurationChanged(newConfig);
      Intent intent = new Intent("onConfigurationChanged");
      intent.putExtra("newConfig", newConfig);
      this.sendBroadcast(intent);
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      // SplashScreen.show(this, com.appmobile.R.style.SplashScreenTheme);
      super.onCreate(savedInstanceState);

      /*
               * RN mainly inside the terminal can not perform MainActivity direct so need to create a method for the implementation of the module RN
               * Use module which way to change the value of the switching function isLister 
      */
      // register a custom broadcast (broadcast sound switch)
      IntentFilter intentFilter = new IntentFilter();
      intentFilter.addAction("com.appmobile.volume"); // com.demo.volume name at random
      networkChangeReceiver = new NetworkChangeReceiver();
      registerReceiver(networkChangeReceiver, intentFilter);
  }

  // Audio Switch
  private class NetworkChangeReceiver extends BroadcastReceiver {
    // receive broadcast content execution
    @Override
    public void onReceive(Context context, Intent intent) {
      // Get the value of the incoming broadcast isLister acquires take less than a second argument, this is false 
      isLister = intent.getBooleanExtra("isLister", false);
    }
  }

  // Send events to the RN side method
  private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
      reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
  }

  // Listen for the phone keypad
  @Override
  public boolean dispatchKeyEvent(KeyEvent event) {
      ReactContext reactContext = getReactInstanceManager().getCurrentReactContext();
      WritableMap params = Arguments.createMap();
      params.putInt("keyCode", event.getKeyCode());
      if (event.getAction() == KeyEvent.ACTION_DOWN) {
          // send keydown event to the end RN
          sendEvent(reactContext, "keydown", params); // keydown can name your own
      } else if (event.getAction() == KeyEvent.ACTION_UP) {
        // Send events to the RN end keyup
          sendEvent(reactContext, "keyup", params);  // keyup can name your own
      }
      return super.dispatchKeyEvent(event);
  }

  @Override
  public boolean onKeyUp(int keyCode, KeyEvent event) {
    // volume keys covering up events (so you adjust the volume of the popups will not appear)
    // can own in accordance with other KeyEvent event to intercept the appropriate action
    if (isLister && keyCode == KeyEvent.KEYCODE_VOLUME_DOWN) {
        return true;
    } else if (isLister && keyCode == KeyEvent.KEYCODE_VOLUME_UP){
        return true;
    } else {
        return super.onKeyUp(keyCode, event);
    }
  }

  public boolean onKeyDown(int keyCode, KeyEvent event) {
    // cover the volume key presses (so you adjust the volume of the popups will not appear)
    if (isLister && keyCode == KeyEvent.KEYCODE_VOLUME_DOWN) {
        return true;
    } else if (isLister && keyCode == KeyEvent.KEYCODE_VOLUME_UP) {
        return true;
    } else {
        return super.onKeyDown(keyCode, event);
    }
  }

}
