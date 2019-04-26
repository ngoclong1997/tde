import axios from 'axios'

export const loginWithUsernameAndPassword = async (username, password) => {
    try {
        console.log("========Start login=========")
        console.log(username, password)

        //call api
        await new Promise((resolve) => {
            setTimeout(resolve, 100)
        })

        return Promise.resolve(true)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const createNewAccount = async (username, password, phone, name) => {
    try {
        console.log("========Start login=========")
        console.log(username, password, phone, name)

        //call api
        await new Promise((resolve) => {
            setTimeout(resolve, 100)
        })

        return Promise.resolve(true)
    } catch (err) {
        return Promise.reject(err)
    }
}