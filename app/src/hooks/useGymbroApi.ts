import { useMemo } from "react"
import { GymbroApi } from "../api/gymbro.api"
import axiosClient from "../api/client"

export const useGymbroApi = () => {    
    return useMemo(() => new GymbroApi(axiosClient), [axiosClient])
}