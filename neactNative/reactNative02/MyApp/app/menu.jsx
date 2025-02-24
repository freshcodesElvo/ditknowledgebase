import { StyleSheet, Appearance, Platform, SafeAreaView, ScrollView, FlatList,View, Text, Image } from "react-native";
import {Colors} from "@/constants/Colors";
import {Menu_Items} from "@/constants/menuItems"
import menu_Images from "@/constants/menuImages"

export default function MenuScreen(){
    const colorScheme = Appearance.getColorScheme;
    const theme = colorScheme === "dark"?  Colors.dark: Colors.light;
    const styles = createStyles(theme, colorScheme)
    const Container = Platform.OS ==='web' ? ScrollView: SafeAreaView;
    const separatorComponent = <View style = {styles.separator}/>
    const headerComp = <Text>Tpp of List </Text>
    const footerComp = <Text>End of Menu </Text>

    return(
        <Container>
            <FlatList
            data={Menu_Items}       
                keyExtractor={(item)=>item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                ItemSeparatorComponent={separatorComponent}
                //ListHeaderComponent={headerComp}
                ListFooterComponent={footerComp}
                ListFooterComponentStyle={styles.footerComp}
                ListEmptyComponent={<Text>No items found</Text>}
                renderItem={({item})=>(
                    <View style = {styles.row}>
                        <View style={styles.menuTextRow}>
                            <Text style = {[styles.menuItemTitle, styles.menuItemText]}>{item.Title}</Text>
                            <Text style = {styles.menuItemText}>{item.Descreption}</Text>
                        </View>
                        <Image source={menu_Images[item.id - 1]}
                        style={styles.menuImage}
                        />
                    </View>

                )}

            />

        </Container>
    )
}

function createStyles( theme, colorScheme){
    return StyleSheet.create({
        contentContainer: {
            paddingTop: 10,
            paddingBottom: 20,
            paddingHorizontal: 12,
            backgroundColor: theme.background,

        },
        separator:{
            height: 1,
            backgroundColor: colorScheme === "dark" ? "papayawhip" : "#000",
            width: '50%',
            maxWidth: 300,
            marginHorizontal: "auto",
            marginBottom: 10
        }, 
        footerComp:{
            marginHorizontal: "auto"

        }, 
        row:{
            flexDirection: "row",
            width:"100%",
            maxWidth: 600,
            height: 100,
            borderStyle: "solid",
            borderBlockColor: colorScheme ==="dark" ? "papayawhip" : "#000",
            borderWidth:1,
            borderRadius: 20,
            overflow: "hidden",
            marginHorizontal: 'auto' 
        },
        menuTextRow:{
            width: '65%',
            paddingTop: 10,
            paddingLeft:10,
            paddingRight: 5,
            flexGrow: 1

        },
        menuItemTitle:{
            fontSize: 18,
            textDecorationLine: "underline",

        },
        menuItemText:{
            color: theme.text
        },
        menuImage:{
            width:100,
            height: 100,
        }
    })
}