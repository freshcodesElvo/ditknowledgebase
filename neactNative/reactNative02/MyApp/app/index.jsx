import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import icedCoffeimg from "@/assets/images/iced-coffee.png"
import { Link } from 'expo-router'

const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
      source={icedCoffeimg}
      resizeMode='cover'
      style={styles.img}
      >
      <Text style={styles.title}>Coffee shop</Text>
      <Link href="/contact" style={{marginHorizontal:"auto"}} asChild >
      <Pressable style={styles.button }><Text style={styles.buttonText} >Contact us</Text></Pressable>
      
      </Link>

      <Link href="/menu" style={{marginHorizontal:"auto"}} asChild >
      <Pressable style={styles.button }><Text style={styles.buttonText} >menu</Text></Pressable>
      
      </Link>
      </ImageBackground>
     
    </View>
  )
}

export default app

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: "column"
  },
  img:{
    width: '100%',
    height:'100%',
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  title:{
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 120
  },
  link:{
    color: "white",
    fontSize: 42,
    fontWeight: "bold", 
    textAlign: "center",
    textDecorationLine: "underline",
    padding: 4
  },
  button:{
    height: 40,
    width: 150,
    borderRadius: 20,
    backgroundColor: "black",
    paddingLeft:30,
    paddingRight:30,
    justifyContent: "center",
    marginBottom: 20
  },
  buttonText:{
    color: "white",
    fontSize: 16,
    fontWeight: "bold", 
    textAlign: "center",
    padding: 4
  }
}) 