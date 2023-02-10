import { View, StyleSheet } from 'react-native';
import { useRef, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { GLView } from 'expo-gl';

export default function App() {
  const cameraRef = useRef();
  const glRef = useRef();
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    if (!permission) {
      return;
    }

    if (!permission.granted) {
      requestPermission();
    }
  }, [permission]);

  const onContextCreate = async (gl) =>{
    console.log('onContextCreate');
    try {
      await glRef.current.createCameraTextureAsync(cameraRef.current);

      console.log('Got camera texture');
    } catch (e) {
      console.log(e);
    }
  };

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={CameraType.back} ref={cameraRef} />
      <GLView style={styles.glView} ref={glRef} onContextCreate={onContextCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: 300,
    height: 300,
  },
  glView: {
    width: 300,
    height: 300,
  }
});
