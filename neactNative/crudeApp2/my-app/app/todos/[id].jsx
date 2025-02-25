import { useLocalSearchParams } from "expo-router";
import {View, Twxt,  StyleSheet, Pressable , TextInput} from 'react-native';
import {useState , useEffect, useContext} from "react"
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "@/context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import {Montserrat_500Medium, useFonts} from "@expo-google-fonts/montserrat"
import {Octicons} from "@expo/vector-icons/Octicons"
import AsyncStorage  from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router";


export default function EditScreen(){
    const {id} = useLocalSearchParams()
    const[todo, setTodo] = useState({})
    const router = useRouter()
    const [loaded, error] = useFonts({Montserrat_500Medium, })
    const {colorScheme, setColorScheme, theme}=useContext(ThemeContext)

    useEffect(()=>{
        const fetchData = async(id)=>{
            try{
                const jasonValue = await AsyncStorage.getItem("TodoApp")
                const storageTodos = jasonValue != null? JSON.parse(jasonValue) : null;
                if(storageTodos && storageTodos.length){
                    const myTodo = storageTodos.find(todo => todo.id.toString() === id)
                    setTodo(myTodo)
                }

            }
            catch(e){
                console.error(e)
            }
        }
        fetchData(id)

    },[id])
    if(!loaded && !error){
        return null
      }
      const styles = createStyles(theme, colorScheme);

      const handleSave = async ()=>{
        try{
            const savedTodo = {...todo, title: todo.title}
            const jasonValue = await AsyncStorage.getItem('TodoApp')
            const storage = jasonValue != null ? JSON.parse(jasonValue) : null;

            if(storageTodos && storageTodos.length){
                const otheTodos= storageTodos.filter(todo => todo.id != savedTodo.id)
                const allTodos = [...otheTodos, savedTodo]
                await AsyncStorage.setItem("TodoApp", JSON.stringify( allTodos))
            }else{
                await AsyncStorage.setItem('TodoApp', JSON.stringify([savedTodo]))
            }
            router.push('/')
        } catch(e){
            console.error(e)

        }
      }
    return(
        <SafeAreaView style ={styles.container}>
             <View style ={styles.inputContainer}> 
                <TextInput style ={styles.input} placeholder="Edit" placeholderTextColor={"gray"} value={todo?.title || ''}  onChange={(text)=> setTodo(prev => ({...prev, title:text}))}/>
                <Pressable
                 onPress={()=>setColorScheme(colorScheme === "light"?          "dark" : "light")}
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
            <View style={styles.inputContainer}>
                <Pressable
                onPress={handleSave}
                style={styles.saveButton}
                
                >
                    <Text style={styles.saveButtonText}>Save</Text>
                </Pressable>

                <Pressable
                onPress={()=> router.push('/')}
                style={[styles.saveButton, {background: "red"}]}
                >
                    <Text style={[styles.saveButtonText, {color:"white"}]}>Cancel</Text>
                </Pressable>
         
            </View>
            <StatusBar style={colorScheme === "dark" ? "light" : "dark"}/>
        </SafeAreaView>
       

    )
}

function createStyles (theme, colorScheme){
    return StyleSheet.create({
        container:{
            flexx: 1,
            width: "100%",
            backgroundColor: theme.background === "dark" ? "light" : "dark" 
        },
    })
}