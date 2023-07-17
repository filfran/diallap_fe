import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const Success = () => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.replace("Login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <View style={styles.endContainer}>
        <Text style={styles.greeting}>👋 {auth.currentUser?.email}</Text>
      </View>

      <View style={styles.endContainer}>
        <TouchableOpacity style={styles.signout} onPress={handleSignOut}>
          <Text style={styles.signoutBtn}>😞 Sign out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.text}>Awesome! 💯</Text>
        <Text>We will contact you shortly. Stay safe 💪</Text>
      </View>
    </>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signout: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#85c623",
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
  },
  signoutBtn: {
    color: "#85c623",
  },
  text: {
    color: "#85c623",
    fontSize: 22,
  },
  endContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginTop: 5,
    marginRight: 5,
  },
  greeting: {
    fontSize: 14,
    fontWeight: 700,
  },
});
