import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../firebase/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const DepositScreen = () => {
  const user = auth.currentUser;
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');
  const [trxId, setTrxId] = useState('');
  const [sender, setSender] = useState('');

  const handleDeposit = async () => {
    if (!amount || !trxId || !sender) {
      Alert.alert('Error', 'Please fill all required fields!');
      return;
    }

    try {
      await addDoc(collection(db, 'deposits'), {
        uid: user.uid,
        note,
        amount,
        trxId,
        sender,
        status: 'Pending',
        createdAt: Timestamp.now(),
      });

      Alert.alert('Success', 'Deposit request submitted!');
      setNote('');
      setAmount('');
      setTrxId('');
      setSender('');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit deposit!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bkash Deposit</Text>

      <Text style={styles.label}>Bkash Number:</Text>
      <Text style={styles.staticText}>01707447499</Text>

      <Text style={styles.label}>Note (optional):</Text>
      <TextInput
        placeholder="Write any note"
        style={styles.input}
        value={note}
        onChangeText={setNote}
      />

      <Text style={styles.label}>Amount (t):</Text>
      <TextInput
        placeholder="Enter amount"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Transaction ID:</Text>
      <TextInput
        placeholder="Enter trx ID"
        style={styles.input}
        value={trxId}
        onChangeText={setTrxId}
      />

      <Text style={styles.label}>Sender Number:</Text>
      <TextInput
        placeholder="Enter sender's number"
        style={styles.input}
        value={sender}
        onChangeText={setSender}
      />

      <TouchableOpacity style={styles.button} onPress={handleDeposit}>
        <Text style={styles.buttonText}>Submit Deposit Request</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DepositScreen;

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
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, marginTop: 20 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
