import { useUser } from "@/hooks/useUser"
import { useRouter } from "expo-router"
import { useEffect } from "react"
import { Text } from "react-native"
import ThemedLoader from "../ThemedLoader"

const GuestOnly = ({ children }) => {
    const { user, authChecked } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (authChecked && user) {
            router.replace("/(dashboard)/home")
        }
    }, [user, authChecked])

    if (!authChecked) {
        return (<ThemedLoader />)
    }

    if (user) {
        return null
    }

    return children
}

export default GuestOnly