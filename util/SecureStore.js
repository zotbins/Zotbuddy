import * as SecureStore from 'expo-secure-store'

export const storeItem = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value)
  } catch (e) {
    console.log(e)
  }
}

export const storeJSONItem = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value))
  } catch (e) {
    console.log(e)
  }
}