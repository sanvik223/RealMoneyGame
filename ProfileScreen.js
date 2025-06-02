import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, storage } from '../firebase/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileScreen = () => {
  const user = auth.currentUser;
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(user?.photoURL || '');
  const [message, setMessage] = useState('');

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      setImage(url);
      await updateProfile(user, { photoURL: url });
      setMessage('Profile picture updated!');
    }
  };

  const handleUpdate = async () => {
    try {
      await updateProfile(user, {
        displayName: name,
        phoneNumber: phone,
      });

      if (password) {
        await auth.currentUser.updatePassword(password);
      }

      setMessage('Profile updated!');
    } catch (err) {
      setMessage('Update failed!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <TouchableOpacity onPress={handleImagePick}>
        <Image
          source={image ? { uri: image } : require('../assets/icon.png')}
          style={styles.profileImage}
        />
        <Text style={styles.link}>Change Profile Picture</Text>
      </TouchableOpacity>

      <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Phone" style={styles.input} value={phone} onChangeText={setPhone} />
      <TextInput placeholder="Email" style={styles.input} value={email} editable={false} />
      <TextInput placeholder="New Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>

      {message ? <Text style={styles.success}>{message}</Text> : null}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 15, borderRadius: 8 },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  link: { marginTop: 10, color: '#0066cc', textAlign: 'center' },
  profileImage: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 10 },
  success: { color: 'green', textAlign: 'center', marginTop: 10 },
});
