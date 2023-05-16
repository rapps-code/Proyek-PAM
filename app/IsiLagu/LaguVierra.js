import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Button } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from "../components/Connect";
import { ref, onValue } from "firebase/database";
import { convertTime } from '../misc/helper';
import { pause, play, resume } from '../misc/audioController';
import { AudioContext } from '../context/AudioProvider';

import { Audio } from 'expo-av';

audioPress = async () => {
    const { playbackObj, soundObj, currentAudio, updateState } = this.context;
    if (soundObj === null) {
        const playbackObj = new Audio.Sound();
        const status = play(playbackObj, currentAudio.uri);
        const index = this.context.audioFiles.indexOf(currentAudio);
    }
    if (
        soundObj.isLoaded &&
        soundObj.isPlaying &&
        currentAudio.id === audio.id
    ) {
        const status = await pause(playbackObj);
        return updateState(this.context, { soundObj: status, isPlaying: false });
    }
}
const LaguVierra = ({ route, navigation, playbackObj }) => {

    // Aawal
    const [sound, setSound] = React.useState();

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(require('../../assets/Lagu/Vierra_Seandainya.mp3')
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }
    async function pauseSound() {
        if (sound) {
            console.log('Pausing Sound');
            await sound.pauseAsync();
        }
    }

    async function resumeSound() {
        if (sound) {
            console.log('Resuming Sound');
            await sound.playAsync();
        }
    }


    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    // Akhir


    const [todoData, setTodoData] = useState([])
    const context = useContext(AudioContext);

    useEffect(() => {
        const starCountRef = ref(db, 'Playlist/' + 'play1/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const newPost = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            setTodoData(newPost);
            console.log(newPost);
        });
    }, [])
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.text}>Mix Santai</Text>
                <Image
                    style={styles.image}
                    source={require('../../assets/Vierra.png')}
                />
                <View style={styles.column}>
                    <View style={styles.icon}>
                        <Icon name="heart" size={20} color="#FF0000" />
                        <Icon name="share" size={20} color="#000000" />
                    </View>
                    <Text style={styles.kanan}>
                        <TouchableOpacity onPress={() => navigation.navigate('InfoLaguVierra')}><Icon name="info-circle" size={20} color="#000000" />
                        </TouchableOpacity></Text>
                </View>
                <View style={styles.Isicolumn}>
                    <Text style={styles.teksJelas}>Time Total   </Text>
                    <Text style={styles.teksJelas}>3j45m</Text>
                </View>
                <Text style={styles.textSub}>Daftar List</Text>
                {/* <Text style={styles.judulSub}>Time Total</Text> */}
                {
                    <View style={styles.containerMusik}>
                        <View style={styles.row}>
                            <View style={styles.columnMusik}>
                                <View style={styles.infoMusik}>
                                    <Text style={styles.namaMusik} >Vierra_Seandainya</Text>
                                    <Text style={styles.durasiMusik} >
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.columnMusik}>
                                <View style={styles.tombolMusik}>
                                    {/* Awal */}
                                    <Button title="Play" onPress={playSound} color="#FFC900" margin='5' flex="1" />
                                    <Button title="Resume" onPress={resumeSound} color="#FFC900" flex="1" />
                                    <Button title="Pause" onPress={pauseSound} color="#FFC900" flex="1" />
                                </View>
                            </View>
                        </View>

                    </View>
                }
                {/* Bagian Musik Pengaturan Akhir */}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    infoMusik: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
    },
    namaMusik: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        // backgroundColor: '#FFC900',
        padding: 5,
        fontSize: 12,
        margin: 1,
        
    },
    durasiMusik: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        // backgroundColor: '#FFC900',
        padding: 5,
        fontSize: 10,
        margin:1,
    },
    row: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
    },
    columnMusik: {
        flex: 1,
        height: 120,
        // backgroundColor: 'blue',
        margin: 5,
        // marginLeft:'5%',
    },
    tombolMusik: {
        margin: 5,
        width: '90%',
        
    },
    tombolMusikPlay: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#FFC900',
        padding: 5,
        fontSize: 12,
        margin: 1,
        borderRadius:10,
    },
    tombolMusikResume: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#FFC900',
        padding: 5,
        fontSize: 12,
        margin: 1,
        borderRadius:10,
    },
    tombolMusikPause: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#FFC900',
        padding: 5,
        fontSize: 12,
        margin: 1,
        borderRadius:10,
        // margin:5,
    },
    containerMusik: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -20,
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        // textAlignVertical: 'center',
        fontSize: 20,
        fontWeight: "bold",
        marginTop: "10%",
    },
    textSub: {
        // textAlign: 'center',
        // textAlignVertical: 'center',
        fontSize: 18,
        textAlign: 'left',
        fontWeight: "bold",
        marginTop: -40,
        marginBottom: 30,
        // alignItems: 'left'
        // marginLeft:-230,
    },
    image: {
        marginTop: "10%",
        width: 200,
        height: 200,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    column: {
        flexDirection: "row",
        paddingTop: 40,
        paddingBottom: 30,
        marginLeft: "-5%",
    },
    icon: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        gap: 20,
    },
    kanan: {
        marginLeft: "50%",
    },
    Isicolumn: {
        flexDirection: "row",
        paddingTop: 40,
        marginLeft: "-5%",
        marginRight: "60%",
    },
    teksJelas: {
        fontSize: 8,
        marginTop: "-40%",
    },
    IsiKonten: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: "-40%",
        marginTop: "-20%",
        // alignItems:"flex-start",
        // justifyContent:"flex-start",
    },
    IsiSubKonten: {
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: "-40%",
        marginBottom: "-20%",
        // alignItems:"flex-start",
        // justifyContent:"flex-start",
    },
    lagu1: {
        flexDirection: "row",
        // flex:1,
        // justifyContent: 'space-between',
        paddingTop: -40,
        paddingBottom: 30,
        // alignItems: 'center',
        // height:10
        // justifyContent: 'center',
        // alignItems: 'center',
        marginLeft: "-5%",
    },
    icon1: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        gap: 20,
    },
    kanan1: {
        marginLeft: "50%",
    },
    Isicolumn1: {
        flexDirection: "row",
        // flex:1,
        // justifyContent: 'space-between',
        paddingTop: 40,
        paddingBottom: 30,
        // alignItems: 'center',
        // height:10
        // justifyContent: 'center',
        // alignItems: 'center',
        marginLeft: "-5%",
        marginRight: "60%",
    },
    teksJelas1: {
        fontSize: 8,
        marginTop: "-40%",
    },
    music: {
        color: "#969696",
        fontSize: 12,
        fontWeight: 700,
        width: 'fit-content',
    },
    musicJumlah: {
        color: "#071D2C",
        fontSize: 15,
        fontWeight: 700,
    },

    musukJumlah: {
        marginRight: "25%",
    },

    musuk1: {
        color: "#969696",
        fontSize: 12,
        fontWeight: 700,
    },
    musukJumlah1: {
        color: "#071D2C",
        fontSize: 15,
        fontWeight: 700,
    },

    btnDetail1: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: 700,
        backgroundColor: '#FFC900',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 6,
    },
    musik11: {
        marginLeft: "30%",
    },
    musukJumlah1: {
        marginRight: "25%",
    },
});
export default LaguVierra