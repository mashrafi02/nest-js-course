import { Injectable } from "@nestjs/common";


@Injectable()
export class UsersService{
    users: {id:number, name:string, age:number, email:string, gender:string}[] = [
        {id:1, name: 'john', age:23, email: 'john@example.com', gender: 'male'},
        {id:2, name: 'whick', age:43, email: 'whick@example.com', gender: 'male'},
        {id:3, name: 'Selena', age:34, email: 'selena@example.com', gender: 'female'},
    ];

    getAllUsers(){
        return this.users;
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
            gender: string
        }
    ) {
        return this.users.push(user)
    }
}