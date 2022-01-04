import { FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import BurgerIcon from '../assets/icons/Burger'
import { globalColors, styles } from '../utils/styles'
import BurgerW from '../assets/icons/Burger-white.png'
import BurgerB from '../assets/icons/Burger-black.png'
import PizzaB from '../assets/icons/Pizza-black.png'
import PizzaW from '../assets/icons/Pizza-white.png'
import AsianB from '../assets/icons/Asian-black.png'
import AsianW from '../assets/icons/Asian-white.png'
import CafeB from '../assets/icons/Cafe-black.png'
import CafeW from '../assets/icons/Cafe-white.png'
import DessertB from '../assets/icons/Dessert-black.png'
import DessertW from '../assets/icons/Dessert-white.png'
import LatinoB from '../assets/icons/Latino-black.png'
import LatinoW from '../assets/icons/Latino-white.png'

const Filter = () => {
    const [selected, setSelected] = useState('American')
    return (
        <>
            <View style={customStyle.container}>
                <View>
                    <TouchableOpacity onPress={() => setSelected('American')} style={selected === 'American' ? customStyle.circleWrapperSelected : customStyle.circleWrapperDefault}>
                        <View style={customStyle.icon}>
                            <Image style={[customStyle.icon, { marginTop: -2 }]} source={selected === 'American' ? BurgerW : BurgerB} />
                        </View>
                    </TouchableOpacity>
                    <Text style={[styles.center, customStyle.label]}>American</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => setSelected('Italian')} style={selected === 'Italian' ? customStyle.circleWrapperSelected : customStyle.circleWrapperDefault}>
                        <View style={customStyle.icon}>
                            <Image style={customStyle.icon} source={selected === 'Italian' ? PizzaW : PizzaB} />
                        </View>
                    </TouchableOpacity>
                    <Text style={[styles.center, customStyle.label]}>Italian</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => setSelected('Asian')} style={selected === 'Asian' ? customStyle.circleWrapperSelected : customStyle.circleWrapperDefault}>
                        <View style={customStyle.icon}>
                            <Image style={customStyle.icon} source={selected === 'Asian' ? AsianW : AsianB} />
                        </View>
                    </TouchableOpacity>
                    <Text style={[styles.center, customStyle.label]}>Asian</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => setSelected('Latin')} style={selected === 'Latin' ? customStyle.circleWrapperSelected : customStyle.circleWrapperDefault}>
                        <View style={customStyle.icon}>
                            <Image style={[customStyle.icon, {width: 35, height: 35, marginTop: 8}]} source={selected === 'Latin' ? LatinoW : LatinoB} />
                        </View>
                    </TouchableOpacity>
                    <Text style={[styles.center, customStyle.label]}>Latin</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => setSelected('Cafe')} style={selected === 'Cafe' ? customStyle.circleWrapperSelected : customStyle.circleWrapperDefault}>
                        <View style={customStyle.icon}>
                            <Image style={customStyle.icon} source={selected === 'Cafe' ? CafeW : CafeB} />
                        </View>
                    </TouchableOpacity>
                    <Text style={[styles.center, customStyle.label]}>Cafe</Text>
                </View>
            </View>

        </>
    )
}

const customStyle = StyleSheet.create({
    container: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    circleWrapperSelected: {
        backgroundColor: globalColors.hotpink,
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent: 'center'
    },
    circleWrapperDefault: {
        borderColor: globalColors.lightgray,
        borderWidth: 0.5,
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent: 'center'
    },
    icon: {
        width: 45,
        height: 45,
        alignSelf: 'center',
        // marginTop: -2,
    },
    label: {
        marginTop: 5,
        color: globalColors.lightgray
    }
})

export default Filter