import { toast } from "react-toastify"

export const useUpdateProfile = (url) => {
    const token = localStorage.getItem('accessToken')

    const update = async (updateInfo, image = null) => {
        try {
            const formData = new FormData()

            for (const key in updateInfo) {
                formData.append(key, updateInfo[key])
            }
            if (image) {
                formData.append('image', image)
            }
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    // "Content-Type": 'application/json'
                },
                body: formData
            })
            if (!response.ok) {
                toast.error('unable to update')
            }
            const result = await response.json()
            console.log(result)
            return result.data
        } catch (error) {

        }
    }
    return update
}