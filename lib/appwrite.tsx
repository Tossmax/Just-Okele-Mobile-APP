import { Account, Avatars, Client, Databases } from "react-native-appwrite";

// export const appwriteConfig = {
//     endpoint: process.env.EXPO_NEXT_PUBLIC_APPWRITE_ENDPOINT!,
//     projectId: process.env.EXPO_NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
//     platform: "com.tosm.justokeleapp",
//     databaseId: "6a9885b6002f4fb5a959",
//     userCollectionId: "user",
// }

// export const client = new Client();

// client
//     .setEndpoint(appwriteConfig.endpoint)
//     .setProject(appwriteConfig.projectId)
//     .setPlatform(appwriteConfig.platform)

// export const account = new Account(client);
// export const databases = new Databases(client);
// export const avatar = new Avatars(client);


const client = new Client()
    .setProject('6a9883d30011bad4c617')
    .setPlatform('com.tosm.justokeleapp');

export const account = new Account(client);
export const avatars = new Avatars(client);