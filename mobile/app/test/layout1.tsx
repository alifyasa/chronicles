import { router } from "expo-router";
import { useEffect } from "react";
import { Button, Text } from "react-native";

export default function TestPage() {
    useEffect(() => {
        const a = setInterval(() => console.log("Page 1"), 500)
        return () => clearInterval(a)
    }, [])
    return (
        <>
        <Text>Test Page 1</Text>
        <Button title="Click Me" onPress={() => router.push("/test/layout2")}></Button>
        </>
    )
}