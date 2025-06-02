import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const ContactUsScreen = () => {
  const [links, setLinks] = useState({});

  useEffect(() => {
    const fetchLinks = async () => {
      const ref = doc(db, 'appInfo', 'contactLinks');
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setLinks(snapshot.data());
      }
    };
    fetchLinks();
  }, []);

  const openLink = (url) => {
    if (url) Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>

      <TouchableOpacity style={styles.button} onPress={() => openLink(links.facebook)}>
        <Text style={styles.buttonText}>📘 Facebook Page</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => openLink(links.messenger)}>
        <Text style={styles.buttonText}>💬 Messenger Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => openLink(links.whatsappGroup)}>
        <Text style={styles.buttonText}>📱 WhatsApp Group</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => openLink(links.whatsappSupport)}>
        <Text style={styles.buttonText}>📞 WhatsApp Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => openLink(links.telegramGroup)}>
        <Text style={styles.buttonText}>📢 Telegram Group</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => openLink(links.telegramSupport)}>
        <Text style={styles.buttonText}>✉️ Telegram Support</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  button: { backgroundColor: '#0066cc', padding: 15, borderRadius: 10, marginBottom: 15 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
});
