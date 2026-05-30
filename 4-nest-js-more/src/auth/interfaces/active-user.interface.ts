import { Role } from "../../constants/constants";


export interface ActiveUserType {
    sub: number;
    username: string;
    role: Role
}