import React from 'react';
import { View, Text, StyleSheet ,SafeAreaView,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Tabs from '../../../Common/TabComponent/Tabs';
import History from './SubMenus/history';
import Ongoing from './SubMenus/onGoing';

const tabs = [
  { title: 'History', content: <History/>},
  { title: 'on-Going', content: <Ongoing/> },
];

const HistoryScreen = ({navigation}) => (
  <SafeAreaView style={styles.container}>
            <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconContainer}>
                    <Icon name="arrowleft" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>History</Text>
            </View>
            <View style={styles.TabContainer}>
      <Tabs tabs={tabs} />
    </View>
        </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
},
header: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
},
iconContainer: {
    flex: 1, 
},
headerTitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: '500',
    flex:20,
    textAlign: 'center',
},
TabContainer:{
  flex: 1,
  marginTop: 10,
}
});

export default HistoryScreen;
