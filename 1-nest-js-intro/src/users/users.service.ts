import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";


@Injectable()
export class UsersService{

    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ){}

    users: {id:number, name:string, age:number, email:string, gender:string, password:string}[] = [
        {id:1, name: 'john', age:23, email: 'john@example.com', gender: 'male', password:"test1234"},
        {id:2, name: 'whick', age:43, email: 'whick@example.com', gender: 'male', password:"test1234"},
        {id:3, name: 'Selena', age:34, email: 'selena@example.com', gender: 'female', password:"test1234"},
    ];

    getAllUsers(){
        if(this.authService.isAuthenticated){
            return this.users;
        }
        return "Unauthorized";
    }

    getUserById(id: number){
        return this.users.find(user => user.id === id);
    }

    createUser(
        user: {
            id:number,
            name: string,
            age: number,
            email: string,
            gender: string,
            password: string
        }
    ) {
        return this.users.push(user)
    }
}