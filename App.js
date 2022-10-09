import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';


export default function App() {
  const [savedContracts, setSavedContracts] = useState([]);


  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === "granted"){
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })

      if (data.length > 0) {
        setSavedContracts(data);
        console.log(data);
      }

    }
  } 
  
  const checkNameAvailability = (contact) => {
    if (contact.name === 'null null') {
      return "null";
    } else return contact.name;
  }

  const checkNumbersAvailability = (contact) => {
    if (contact.phoneNumbers === undefined) {
      return "[N/A]";
    } else return contact.phoneNumbers[0].number;
  }


  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "20%"
        }}
      />
    );
  };


  return (
    <View style={styles.container} >
      <FlatList 
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => 
          <View style={styles.listcontainer}>
            <Text style={{fontSize: 18}}>{checkNameAvailability(item)} {checkNumbersAvailability(item)} </Text>
          </View>} 
        data={savedContracts} 
        ItemSeparatorComponent={listSeparator} 
      />  
    <Button title="Get contacts" onPress={getContacts} />
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
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
   },
});


/*


      data.forEach(contact => {
        if (contact != undefined && contact != null) {
          setSavedContracts([...savedContracts, contact]);
          console.log(contact);
        }
      });

     
    }
  } 
  
  const checkNumbersValidity = (contact) => {
    if (contact.phoneNumbers[0] === undefined) {
      return "null";
    } else {
      return contact.phoneNumbers[0].number;
    }
  }


*/