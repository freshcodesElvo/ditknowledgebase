import { Text, View,TextInput, Pressable, StyleSheet, FlatList} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context" 
import { useState,useContext, useEffect } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import {data} from "@/data/todos"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Montserrat_500Medium, useFonts} from "@expo-google-fonts/montserrat"
import Animated , {LinearTransition} from "react-native-reanimated"
import Octicons from "@expo/vector-icons/Octicons"
import AsyncStorage  from "@react-native-async-storage/async-storage"
import {StatusBar} from "expo-status-bar"
import { useRouter } from "expo-router";
export default function Index() {
  const [todos, setTodos] = useState([])
  const [text, setText] =  useState("")
  const {colorScheme, setColorScheme, theme}=useContext(ThemeContext)
  const [loaded, error] = useFonts({Montserrat_500Medium, })
  const router =useRouter()

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const jasonValue =  await AsyncStorage.getItem("TodoApp")
        const storageTodos = jasonValue !=null ? JSON.parse(jasonValue) : null 

        if(storageTodos && storageTodos.length){
          setTodos(storageTodos.sort((a,b)=>b.id-a.id))
        }
        else{
          setTodos(data.sort((a,b)=> b.id-a.id))
        }
         
      }catch(e){
        console.error(e)
      }
    }

    fetchData()

  },[data])
  useEffect(()=>{
    const storeData = async ()=>{
      try{
        const jasonValue = JSON.stringify(todos)
        await AsyncStorage.setItem("TodoApp", jasonValue)

      }
      catch(e){
        console.error(e)
      }
    }
    storeData()

  }, [todos])

  if(!loaded && !error){
    return null
  }
  const styles = createStyles(theme , colorScheme)
  const addTodo = ()=>{
    if(text.trim()){
      const newId = todos.length>0 ? todos[0].id+1 : 1;
      setTodos([{id: newId, title: text , completed: false}, ...todos])
      setText("") ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
  }
  const toggleTodo = (id ) =>{
    setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed}: todo))
  }
  const removeTodo = (id)=>{
    setTodos(todos.filter(todo=>todo.id !== id))
  }

  const handlePress = (id)=>{
    router.push(`/todos/${id}`)
  }
  const renderItem = ({item}) =>{
    return (
      <View style={styles.todoItem}>
        
        <Pressable onPress={()=> handlePress(item.id)}   onLongPress={()=>toggleTodo(item.id)}>
        <Text 
          style={[styles.todoText, item.completed && styles.completedText]}
        
        >
          {item.title}
        </Text>
        </Pressable>
        <Pressable onPress={() => removeTodo(item.id)}> {/* Add onPress and pass item.id */}
          <MaterialCommunityIcons name="delete-circle" size={32} color="red" /> {/* Removed selectable */}
        </Pressable>
      </View>
    );
  }
  return (
    <SafeAreaView 
    style={styles.container}
    >
      <View style={styles.inputContainer}>
        <TextInput
        style={styles.input}
        placeholder="Add a new to do"
        placeholderTextColor="gray"
        value={text}
        onChangeText={setText}
         />
        <Pressable
        onPress={addTodo}
        style={styles.addBtn}
        >
          <Text style={styles.addBtnText}>Add</Text>
        </Pressable>
        <Pressable
        onPress={()=>setColorScheme(colorScheme === "light"? "dark" : "light")}
        style = {{marginLeft: 10}}
        >
           {colorScheme === 'dark' 
           ? 
        <Octicons name="moon" size={36} color={theme.text} selectable={undefined} style={{width: 36}} />
      : 
        <Octicons name="sun" size={36} color={theme.text} selectable={undefined} style={{width: 36}} />
      }

        </Pressable>

      </View>

      <Animated.FlatList
      data={todos}
      renderItem={renderItem}
      keyExtractor={todo => todo.id}
      contentContainerStyle={{flexGrow: 1}}
      itemLayoutAnimation={LinearTransition}
      keyboardDismissMode="on-drag"

      />

      <StatusBar style={colorScheme === "dark" ? "light": "dark"}/>
    </SafeAreaView>
  );
}
function createStyles(theme, colorScheme) {
  return StyleSheet.create({
  container:{
    flex: 1,
    width: "100%",
    backgroundColor: theme.background
  },
  inputContainer:{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    width: "100%",
    maxWidth: 1024,
    marginHorizontal: 'auto',
    pointerEvents: 'auto'
  },
  input:{
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight:10,
    fontSize: 18,
    fontFamily: "Montserrat_500Medium",
    minWidth: 0, 
    color: theme.text

  },
  addBtn:{
    backgroundColor: theme.button,
    borderRadius: 5,
    padding: 10,

  },
  addBtnText:{
    fontSize: 18,
    color: colorScheme=== "dark"? "black" : "white",
  },
  todoItem:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    padding: 10,
    borderBottomColor: "white",
    width: "100%",
    maxWidth: 1024,
    marginHorizontal: "auto",
    pointerEvents: "auto",
    borderBottomWidth: .25
  },
  todoText:{
    flex: 1,
    fontSize: 18,
    color: theme.text,
    fontFamily: "Montserrat_500Medium",
  },
  completedText:{
    textDecorationLine: "line-through",
    color: "gray" 
  }
})}