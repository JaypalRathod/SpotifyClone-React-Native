import axios from "axios";

const UPLOAD_API = 'http://192.168.2.140:3000/upload'

export const uploadImage = async (local_uri: string) => {
    try {
        const formData = new FormData();
        formData.append('file', {
            uri: local_uri,
            name: 'file',
        })

        const res = await axios.post(UPLOAD_API, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}