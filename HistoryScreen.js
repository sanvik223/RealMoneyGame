import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/firebaseConfig';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

const HistoryScreen = () => {
  const user = auth.currentUser;
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const depositRef = query(
      collection(db, 'deposits'),
      where('uid', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const withdrawRef = query(
      collection(db, 'withdrawals'),
      where('uid', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe1 = onSnapshot(depositRef, (snapshot) => {
      const deposits = snapshot.docs.map(doc => ({
        ...doc.data(),
        type: 'Deposit',
        id: doc.id,
      }));
      setTransactions(prev => [...prev, ...deposits]);
    });

    const unsubscribe2 = onSnapshot(withdrawRef, (snapshot) => {
      const withdrawals = snapshot.docs.map(doc => ({
        ...doc.data(),
        type: 'Withdraw',
        id: doc.id,
      }));
      setTransactions(prev => [...prev, ...withdrawals]);
    });

    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, []);

  const sortedTransactions = transactions.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.date}>{new Date(item.createdAt?.seconds * 1000).toLocaleString()}</Text>
      <Text style={styles.text}>{item.type} - t{item.amount} - {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      <FlatList
        data={sortedTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  item: { borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 10 },
  date: { color: '#666', fontSize: 12 },
  text: { fontSize: 16, fontWeight: 'bold' },
});
