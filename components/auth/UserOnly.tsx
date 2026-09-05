import { useUser } from "@/hooks/useUser"
import { useRouter } from "expo-router"
import { useEffect } from "react"
import { Text } from "react-native"
import ThemedLoader from "../ThemedLoader"

const UserOnly = ({ children }) => {
    const { user, authChecked } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (authChecked && !user) {
            router.replace("/(auth)/login")
        }
    }, [user, authChecked])

    if (!authChecked) {
        return (<ThemedLoader/>)
    }

    if (!user) {
        return null
    }

    return children
}

export default UserOnly


// import { useUser } from "@/hooks/useUser"
// import { useRouter } from "expo-router"
// import { useEffect } from "react"
// import { Text } from "react-native"

// const UserOnly = ({ children }) => {
//     const { user, authChecked} = useUser()
//     const router = useRouter()

    
//     useEffect(() => {
//         if( authChecked && user === null) {
//             router.replace('/(auth)/login')
//         }
//     }, [user, authChecked])

//     if (!authChecked || !user) {
//         <Text> Loading... </Text>
//     }

//     return children
// }

// export default UserOnly