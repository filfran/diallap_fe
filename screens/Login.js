import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleAuth = async (action) => {
    try {
      let userCredentials;
      if (action === "signup") {
        userCredentials = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
      } else if (action === "login") {
        userCredentials = await auth.signInWithEmailAndPassword(
          email,
          password
        );
      } else {
        throw new Error("Invalid action: " + action);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const checkLogin = auth.onAuthStateChanged((user) => {
      if (user) navigation.replace("Home");
    });

    return checkLogin;
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleAuth("login")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login ⭐</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleAuth("signup")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register 🌟</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#85c623",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#85c623",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: 700,
    fontSize: 16,
  },
  buttonOutlineText: { color: "#85c623", fontWeight: 700, fontSize: 16 },
});
