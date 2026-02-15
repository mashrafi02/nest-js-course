import { Injectable } from "@nestjs/common";


@Injectable()
export class UsersService{
    users: {id:number, name:string, age:number, gender:string}[] = [
        {id:1, name: 'john', age:23, gender: 'male'},
        {id:2, name: 'whick', age:43, gender: 'male'},
        {id:3, name: 'Selena', age:34, gender: 'female'},
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
            gender: string
        }
    ) {
        return this.users.push(user)
    }
}