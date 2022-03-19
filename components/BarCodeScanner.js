import React, {Component} from 'react';
import { View, Dimensions, Text } from 'react-native';
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios'


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

// TODO: FIX WARNING 
// expo-permissions is now deprecated — the functionality has been moved to other expo packages 
// that directly use these permissions (e.g. expo-location, expo-camera). The package will be removed in the upcoming releases.

export default class BarCodeScannerComponent extends Component{
    state = {
        data: {},
        CameraPermissionGranted: null
    }
    async componentDidMount(){
        
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({CameraPermissionGranted: status == "granted" ? true: false})
    }
     barCodeScanned = ({data}) => {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        //data = data.substring(2, data.length)
        var self = this;
        axios.defaults.headers.common = {
            "X-API-Key": "2d0e68bd4fea4a34bcf4f43ea22d2b72",
        };
       /* axios({method: "get", url: "http://ec2-35-82-126-163.us-west-2.compute.amazonaws.com/v0/barcode/"+data, config}).then(function(response){
            self.setState({data: response.data});
            
            console.log(response.data)
            alert("Name: " + response.data.item + "\nWaste Bin: " + response.data.bin);
            
        }).catch(function(error){
            console.log(error);
        });*/

        console.log(data)

    }
    render(){
        const {CameraPermissionGranted} = this.state
        if(CameraPermissionGranted == null){
            return(
            <Text>Please grant Camera permission</Text>
            )
        }
        if(CameraPermissionGranted == null){
            return(
            <Text>Camera permission denied</Text>
            )
        }
        else{
            return(
                <View style = {{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <BarCodeScanner
                        onBarCodeScanned = {this.barCodeScanned}
                        style = {{
                            height: DEVICE_HEIGHT/1.1,
                            width: DEVICE_WIDTH/1.1,
                        }}>
                    </BarCodeScanner>
                </View>
            );
        }
    }
}