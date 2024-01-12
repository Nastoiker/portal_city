import { IUser } from "@/types/User.interface"

export interface IHeaderProps {
    user?: IUser
    scrolled: boolean
    setIsLogin: () => void
    setIsLogout: () => void
}