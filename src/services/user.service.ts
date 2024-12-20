import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";
import { NotFoundError } from "../errors/not-found.error";

export class UserService {
    async getAll(): Promise<User[]> {
        const snapshot = await getFirestore().collection("users").get();
                return snapshot.docs.map(doc => {
                    return {
                            id: doc.id, 
                            ...doc.data()
                    };
        
                }) as User[];        
    }
    
    async getById(id: string): Promise<User> {
        const doc = await getFirestore().collection("users").doc(id).get();
            if(doc.exists) {    
                    return{
                        id: doc.id,
                        ...doc.data()
                    } as User;
            } else {
                    throw new NotFoundError("Usuário não encontrado!");
                }
    }

    async save(user: User): Promise<void> {
        await getFirestore().collection("users").add(user);           
    }
}   


