import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Reset link sent! Check your email.');
      setError('');
    } catch (err) {
      setMessage('');
      setError('Failed to send reset email');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <TextInput placeholder="Enter your email" style={styles.input} value={email} onChangeText={setEmail} />

      {message ? <Text style={styles.success}>{message}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Send Reset Email</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 15, borderRadius: 8 },
  button: { backgroundColor: '#ffc107', padding: 15, borderRadius: 8 },
  buttonText: { color: '#000', textAlign: 'center', fontWeight: 'bold' },
  link: { marginTop: 15, color: '#0066cc', textAlign: 'center' },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  success: { color: 'green', textAlign: 'center', marginBottom: 10 },
});
