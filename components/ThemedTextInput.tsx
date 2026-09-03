import { TextInput } from 'react-native'




const ThemedTextInput = ({ ...props }) => {
  return (
    <TextInput placeholder="Enter email address" 
      style={{ borderWidth: 1, 
        borderColor: '#AC4B04', padding: 20, 
        borderRadius: 5, width: 350, 
        marginBottom: 20, marginTop: 20,
        color: '#000000', fontSize: 10,}}
      {...props} />
  )
}   

export default ThemedTextInput
