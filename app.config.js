import credentials from "./credentials.json"
export default {
    expo: {
        name: "Gestión Digital",
        slug: "gestion-digital",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#046CA0"
        },
        updates: {
            fallbackToCacheTimeout: 0
        },
        assetBundlePatterns: [
            "**/*"
        ],
        android: {
            package: "com.stackverse.gestiondigital",
            config: {
                googleSignIn: {
                    apiKey: credentials.apiKey,
                    certificateHash: credentials.certificateHash
                },
                googleMaps: {
                    apiKey: credentials.apiKey
                }
            },
            versionCode: 1,
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#FFFFFF"
            }
        }
    }
}