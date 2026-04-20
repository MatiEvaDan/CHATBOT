import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (isLogin) {
      alert(`Logger ind med:\n${email}`);
    } else {
      alert(`Opretter bruger:\n${email}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isLogin ? 'Login 🔐' : 'Opret bruger ✨'}
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Adgangskode"
        placeholderTextColor="#ccc"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {isLogin ? 'Login' : 'Opret'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin
            ? 'Har du ikke en bruger? Opret her'
            : 'Har du allerede en bruger? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1F44',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 32,
    color: '#4FC3F7',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 1.5,
  },

  input: {
    backgroundColor: '#1E3A8A',
    color: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#4FC3F7',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#0A1F44',
    fontWeight: 'bold',
    fontSize: 18,
  },

  switchText: {
    color: '#B3E5FC',
    marginTop: 20,
    textAlign: 'center',
  },
});