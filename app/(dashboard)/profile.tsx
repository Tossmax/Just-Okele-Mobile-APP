import { useUser } from '@/hooks/useUser'
import { Text, View, Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {

  const { logout, user } = useUser()

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <Text>
          Profile
          {user.email}
        </Text>
      </View>
      <Pressable onPress={logout} style={{backgroundColor: '#AC4B04', padding: 20, borderRadius: 5, marginTop: 20, width: 350, marginBottom: 40}}>
        <Text style={styles.btn}>Log Out</Text>
      </Pressable>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
 
  btn: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
})
