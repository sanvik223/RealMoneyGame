import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleGamePress = (gameName) => {
    navigation.navigate('GameScreen', { game: gameName });
  };

  return (
    <View style={styles.container}>
      {/* উপরের সেকশন */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.profileIcon}>
          <Text style={styles.profileText}>👤</Text>
        </TouchableOpacity>
        <Text style={styles.balanceText}>Available: t18239.6</Text>
        <TouchableOpacity style={styles.depositButton}>
          <Text style={styles.depositText}>Deposit</Text>
        </TouchableOpacity>
      </View>

      {/* ব্যানার সেকশন */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerScroll}>
        <Image source={{ uri: 'https://via.placeholder.com/300x120.png?text=Banner1' }} style={styles.banner} />
        <Image source={{ uri: 'https://via.placeholder.com/300x120.png?text=Banner2' }} style={styles.banner} />
      </ScrollView>

      {/* গেম সেকশন */}
      <View style={styles.gameGrid}>
        <TouchableOpacity style={styles.gameButton} onPress={() => handleGamePress('LUDO')}>
          <Text style={styles.gameText}>🎲 LUDO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gameButton} onPress={() => handleGamePress('CARROM')}>
          <Text style={styles.gameText}>🎯 CARROM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gameButton} onPress={() => handleGamePress('CHESS')}>
          <Text style={styles.gameText}>♟️ CHESS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gameButton} onPress={() => handleGamePress('BEAD 16')}>
          <Text style={styles.gameText}>🪙 BEAD 16</Text>
        </TouchableOpacity>
      </View>

      {/* নেভিগেশন বার */}
      <View style={styles.navBar}>
        <Text style={styles.navItem}>🏠</Text>
        <Text style={styles.navItem}>📜</Text>
        <Text style={styles.navItem}>💸</Text>
        <Text style={styles.navItem}>👥</Text>
        <Text style={styles.navItem}>📞</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15 },
  profileIcon: { backgroundColor: '#eee', padding: 10, borderRadius: 20 },
  profileText: { fontSize: 20 },
  balanceText: { fontSize: 16, fontWeight: 'bold' },
  depositButton: { backgroundColor: '#007bff', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  depositText: { color: '#fff', fontWeight: 'bold' },
  bannerScroll: { paddingHorizontal: 10, marginTop: 10 },
  banner: { width: 300, height: 120, borderRadius: 10, marginRight: 10 },
  gameGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: 20 },
  gameButton: { backgroundColor: '#f0f0f0', width: '40%', padding: 20, margin: 10, alignItems: 'center', borderRadius: 10 },
  gameText: { fontSize: 16, fontWeight: 'bold' },
  navBar: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, borderTopWidth: 1, borderTopColor: '#ccc', position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#fff' },
  navItem: { fontSize: 20 },
});
