import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const GameScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { game } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{game} Deposit</Text>

      <Image
        source={{ uri: 'https://via.placeholder.com/200x200.png?text=' + game }}
        style={styles.image}
      />

      <Text style={styles.gameName}>{game}</Text>

      {/* নিচের ন্যাভিগেশন আইকন */}
      <View style={styles.navBar}>
        <TouchableOpacity>
          <Text style={styles.navItem}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navItem}>📜</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navItem}>💸</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navItem}>📞</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  image: { width: 200, height: 200, borderRadius: 15, marginBottom: 20 },
  gameName: { fontSize: 22, fontWeight: 'bold', marginBottom: 40 },
  navBar: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', position: 'absolute', bottom: 20 },
  navItem: { fontSize: 24 },
});
