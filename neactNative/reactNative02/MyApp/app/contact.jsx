import {View, Text, StyleSheet} from 'react-native';
import React from 'react'
const explore = () => {
  return (
    <View style={styles.container}>
      
      <Text style={styles.heading}>The Cozy Bean</Text>
      <Text>Address: 456 Oak Avenue, Springfield, IL 62704, USA</Text>
      <Text>Phone: +1 (217) 555-2345</Text>
      <Text>Website:www.thecozybean.com</Text>
      <Text>PEmail: cozybean@gmail.com</Text>
      <Text>Latitude: 39.7984</Text>
      <Text>Longitude: -89.6499</Text>

      <View style = {styles.container2}>
      <Text style={styles.heading}>Hours</Text>

     <Text>Monday - Friday: 7:00 AM - 6:00 PM</Text>

     <Text>Saturday: 8:00 AM - 5:00 PM</Text>

     <Text>Sunday: Closed</Text>
      </View>


      
      <View style={styles.container2}>
      <Text style={styles.heading}>Description</Text>
      <Text>A warm and inviting coffee shop with comfortable seating, offering a variety of freshly brewed coffees, teas, and homemade pastries. We also serve light lunch options, including sandwiches and salads.  Our baristas are passionate about coffee and are always happy to recommend their favorites</Text>
      

      </View>

      <View style={styles.container2}>
      <Text style={styles.heading}>Menu</Text>
      <Text>Coffee: Cappuccino, Latte, Espresso, Americano, Mocha, Iced Coffee</Text>
      <Text>Tea: Black Tea, Green Tea, Herbal Tea, Chai Latte</Text>
      <Text>Pastries: Croissants, Muffins, Scones, Cookies</Text>
      <Text>Lunch: Sandwiches (Turkey, Ham, Veggie), Salads (Caesar, Greek)</Text>
      </View>
      
     
     
     
    </View>
  )
}

export default explore;
const styles = StyleSheet.create({
    container:{
        
        paddingLeft: 10
    },
    heading:{
        fontSize: 20,
        fontWeight: "bold",

    },
    container2:{
        paddingTop:16,

    },
})