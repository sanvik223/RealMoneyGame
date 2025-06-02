import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../firebase/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const WithdrawScreen = () => {
  const user = auth.currentUser;
  const [method, setMethod] = useState('Personal');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const availableBalance = '18239.6'; // Static for now

  const handleWithdraw = async () => {
    if (!amount || !account) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }

    try {
      await addDoc(collection(db, 'withdrawals'), {
        uid: user.uid,
        method,
        account,
        amount,
        status: 'Pending',
        createdAt: Timestamp.now(),
      });

      Alert.alert('Success', 'Withdraw request submitted!');
      setAmount('');
      setAccount('');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit withdraw request!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Withdraw Money</Text>

      <Text style={styles.label}>Withdraw Method:</Text>
      <Text style={styles.staticText}>Personal (default)</Text>

      <Text style={styles.label}>Account Number / ID:</Text>
      <TextInput
        placeholder="Enter account number or ID"
        style={styles.input}
        value={account}
        onChangeText={setAccount}
      />

      <Text style={styles.label}>Amount (t):</Text>
      <TextInput
        placeholder="Enter amount"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <Text style={styles.balanceText}>Available Balance: t{availableBalance}</Text>

      <TouchableOpacity style={styles.button} onPress={handleWithdraw}>
        <Text style={styles.buttonText}>Submit Withdraw Request</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WithdrawScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontWeight: 'bold', marginTop: 10 },
  staticText: { fontSize: 16, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 10,
  },
  balanceText: { marginTop: 15, textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: 'green' },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, marginTop: 20 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
