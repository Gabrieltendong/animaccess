import EncryptedStorage from 'react-native-encrypted-storage';

export const setAuthUser = async (auth) => {
    try {
        await EncryptedStorage.setItem(
            "user_session",
            JSON.stringify(auth)
        );
    } catch (error) {
        // There was an error on the native side
    }
}

export const getAuthUser = async () => {
    try {
        const session = await EncryptedStorage.getItem(
            "user_session",
        );
        if(session !== undefined){
            return session
        }
    } catch (error) {
        // There was an error on the native side
    }
}