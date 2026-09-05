import { View, Text, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import { useUser } from '@/hooks/useUser'
import ThemedTextInput from '@/components/ThemedTextInput'


export default function Register() {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)

  const { register } = useUser();

  const handleRegister = async () => {

    setError(null)

    try{
      await register(email, password, name);
    } catch (error) {
      setError(error.message)
    }
    
   
    // Add your login logic here
  }


  return (
    <SafeAreaView style={styles.container2}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        <Text>New User Create Account</Text>
        
        <ThemedTextInput 
        placeholder="name" 
        placeholderTextColor="#b3b3b3"
        keyboardType="name" 
        onChangeText={setName}
        value={name}
        />
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
        
        <Pressable onPress={handleRegister} style={{backgroundColor: '#AC4B04', padding: 20, borderRadius: 5, marginTop: 20, width: 350, marginBottom: 40}}>
          <Text style={styles.btn}>Register</Text>
        </Pressable>

        {error && <Text style={{ color: 'red', width:350, alignSelf: 'center'}}>{error}</Text>}
        <Link href="/(auth)/login"  style={styles.linkText}>
          Already have an account? Login
        </Link>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container2: {
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
