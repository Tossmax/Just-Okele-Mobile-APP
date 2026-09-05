import { View, Text, Pressable, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import ThemedTextInput from '@/components/ThemedTextInput'
import { useUser } from '@/hooks/useUser'

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)



  const { login } = useUser();

  const handleLogin = async () => {
    
    setError(null)

    try{
      await login(email, password);
    } catch (error) {
      setError(error.message)
    }
    
    // Add your login
  }

  return (
    <SafeAreaView style={styles.container1}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        <Text style={{marginBottom: 20}}>Welcome Back!</Text>
        
        <ThemedTextInput 
        placeholder="Email address" 
        placeholderTextColor="#b3b3b3"
        keyboardType="email-address" 
        onChangeText={setEmail}
        value={email}
        />
        <ThemedTextInput 
        placeholder="Password" 
        placeholderTextColor="#b3b3b3"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
        />
        
        <Pressable onPress={handleLogin} style={{backgroundColor: '#AC4B04', padding: 20, borderRadius: 5, marginTop: 20, width: 350, marginBottom: 40}}>
          <Text style={styles.btn}>Login</Text>
        </Pressable>

        {error && <Text style={{ color: 'red', width:350, alignSelf: 'center'}}>{error}</Text>}
        <Link href="/(auth)/register" style={styles.linkText}>
          New User? Register a new account
        </Link>
        </View>  
        </TouchableWithoutFeedback> 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn: {
    color: '#FFFFFF',
    textAlign: 'center',
  },

  linkText: {
    color: '#AC4B04',
    marginTop: 40,
    alignSelf: 'center',
  }
})
