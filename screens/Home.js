import React, { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";

const Home = () => {
  const [token, setToken] = useState("");
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [record, setRecord] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [isRecording, setIsRecording] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [uploading, setUploading] = useState(false);

  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.replace("Login");
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePermissions = async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === "granted");

    const audioStatus = await Camera.requestMicrophonePermissionsAsync();
    setHasAudioPermission(audioStatus.status === "granted");

    if (cameraStatus.status === "granted" && audioStatus.status === "granted")
      setShowCamera(true);
  };

  const handleRecord = async () => {
    if (!camera) return;

    if (isRecording) {
      try {
        setIsRecording(false);
        const data = await camera.stopRecording();
      } catch (error) {
        // console.error("Error stopping recording:", error);
      }
    } else {
      try {
        setIsRecording(true);
        const data = await camera.recordAsync({ maxDuration: 15 });
        setRecord(data.uri);
      } catch (error) {
        // console.error("Error starting recording:", error);
        setIsRecording(false);
      }
    }
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("video", {
        uri: record,
        name: "video.mov",
        type: "video/quicktime",
      });
      const response = await fetch(
        "https://diallapp-demo-2bede93da4f0.herokuapp.com/api/upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      // console.log(JSON.stringify(response));
      navigation.navigate("Success");

      if (response.status !== 200)
        throw new Error("Something went wrong.. Please try again");
    } catch (error) {
      // console.log(JSON.stringify(error));
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    const getUserToken = async () => {
      try {
        const idToken = await user.getIdToken(true);
        setToken(idToken);
      } catch (error) {
        alert(error.message);
      }
    };
    getUserToken();
  }, []);

  return (
    <>
      <View style={styles.endContainer}>
        {showCamera ? (
          <Text onPress={() => setShowCamera(false)}>🔙 Back</Text>
        ) : (
          <Text></Text>
        )}
        <View>
          <Text style={styles.greeting}>👋 {auth.currentUser?.email}</Text>
          <TouchableOpacity style={styles.signout} onPress={handleSignOut}>
            <Text style={styles.signoutBtn}>😞 Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {hasCameraPermission && hasAudioPermission && showCamera ? (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={type}
            ref={(ref) => setCamera(ref)}
          />

          {isRecording ? (
            <Text style={styles.recording}>🎥</Text>
          ) : (
            <Text
              style={styles.reverse}
              onPress={() =>
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                )
              }
            >
              🔁
            </Text>
          )}
          {record && (
            <Video
              source={{ uri: record }}
              useNativeControls
              resizeMode="contain"
              isLooping
              style={{ flex: 1 }}
            />
          )}
          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={handleRecord}
              style={styles.btn}
              disabled={uploading}
            >
              <Text style={styles.text}>
                {isRecording ? "Stop Recording 🛑" : "Record Video 🎥"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleUpload}
              style={styles.btn}
              disabled={record === null || uploading}
            >
              <Text style={styles.text}>
                {uploading ? "Uploading ⌛" : "Finish 🤩"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.paragraph}>How about uploading a video? 🤔</Text>
          <Text>Our experts will resolve your problem in no time!</Text>
          <TouchableOpacity style={styles.button} onPress={handlePermissions}>
            <Text style={styles.text}>Start recording 🎥</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#85c623",
    width: "80%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  btn: {
    backgroundColor: "#85c623",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  signout: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#85c623",
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  signoutBtn: {
    color: "#85c623",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  endContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  greeting: {
    fontSize: 14,
    fontWeight: "700",
  },
  recording: {
    position: "absolute",
    top: 20,
    left: 20,
    fontSize: 25,
  },
  reverse: {
    position: "absolute",
    top: 20,
    right: 20,
    fontSize: 25,
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 50,
    marginLeft: 30,
    marginRight: 30,
  },
});
