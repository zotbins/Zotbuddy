import React, {Component} from 'react';
import { View, Dimensions, Text, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios'
import { useEffect, useState } from 'react';
import BackButton from './BackButton';
import { useNavigation } from '@react-navigation/native'

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

// TODO: FIX WARNING 
// expo-permissions is now deprecated — the functionality has been moved to other expo packages 
// that directly use these permissions (e.g. expo-location, expo-camera). The package will be removed in the upcoming releases.

const Scanner = (props) => {
    const [barcodeData, setBarcodeData] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    useEffect(() => {
        // DEPRECATED
        // const {status} = await Permissions.askAsync(Permissions.CAMERA)
        // this.setState({CameraPermissionGranted: status == "granted" ? true: false})
        // ==
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const navigation = useNavigation();
    const onBackPage = () => {
        navigation.goBack()
    };
     const onBarCodeScanned = ({data}) => {
        // const config = {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   };
        // //data = data.substring(2, data.length)
        // var self = this;
        // axios.defaults.headers.common = {
        //     "X-API-Key": "2d0e68bd4fea4a34bcf4f43ea22d2b72",
        // };
       /* axios({method: "get", url: "http://ec2-35-82-126-163.us-west-2.compute.amazonaws.com/v0/barcode/"+data, config}).then(function(response){
            self.setState({data: response.data});
            
            console.log(response.data)
            alert("Name: " + response.data.item + "\nWaste Bin: " + response.data.bin);
            
        }).catch(function(error){
            console.log(error);
        });*/

        // console.log(data)
        // ==
        setScanned(true);
        axios.get("https://zotbins.pythonanywhere.com/barcode/get", 
        {params: {barcode: data}}).then(function(response){
            setBarcodeData(data);
            alert("Instructions: " + data.instructions + "\n" + "Name: " + data.name + 
            "\n" + "Type: " + data.type + "\n" + "Waste Bin: " + data.wastebin);
            console.log(barcodeData.data)
        }).catch(function(error){
            console.log(error);
        });
    }

    if (hasPermission == null){
        return <Text>Please grant Camera permission</Text>;
    }
    if (hasPermission == null){
        return <Text>Camera permission denied</Text>;
    }
    else{
        return(
            <View style ={{flex: 1}}>
                <BackButton nav={onBackPage}/>
                <View style = {{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <BarCodeScanner
                        // only fire scan function if we are not in the process of another scan
                        onBarCodeScanned = {scanned ? undefined : onBarCodeScanned}
                        style = {{
                            height: DEVICE_HEIGHT/4,
                            width: DEVICE_WIDTH/1.1,
                        }}>
                    </BarCodeScanner>
                    {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
                </View>
            </View>
        );
    }
    
}

export default Scanner;