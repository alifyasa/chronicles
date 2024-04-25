import { useEffect } from "react";
import { Text } from "react-native";

export default function TestPage() {
    useEffect(() => {
        const a = setInterval(() => console.log("Page 2"), 500)
        return () => clearInterval(a)
    }, [])
    return (
        <Text>Test Page 1</Text>
    )
}