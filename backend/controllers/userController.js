import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

const userController = {
    async getAll(req,res) {
        try {
            const users = await UserModel.getAll();
            res.json(users)
       }
       catch (error) {
            console.error('Error fetching users', error);
            res.status(500).json({error: "Internal server Error"})
       }
    },

    async getById(req,res) {
        const {id} = req.params;
        try {
            const user = await UserModel.getById(id);
            if (user) {
                res.json(user);
            } else{
                res.status(404).json({error: 'User not found'})
            }
        }
        catch (error) {
            console.error("Error fetching user", error);
            res.status(500).json({error: "Hiba!"})
        }
    },

    async create(req,res) {
            const {email,password,name,phone} = req.body;
            console.log(req.body)
            const hashedPassword = await bcrypt.hash(password,10);
        try {
            const newUser = await UserModel.create({email,password: hashedPassword, name, phone, role: 0})
            res.status(201).json(newUser);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(400).json({message: "Már létezik ez az emailcim"});
                return;
            }
            console.error('Error creating user', error);
            res.status(500).json({error: "Internal server Error"});
        }
    },

    // Login

    async login(req,res) {
        const {email,password} = req.body;
        try {
            const user = await UserModel.getByEmail(email);
            if (!user) {
                res.status(404).json({error : "Nincs ilyen felhasznalo"});
                return;
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(401).json({error: "Hibás jelszó!"});
                return;
            }

            await UserModel.updateLastLogin(user.id)
            res.json({message: "Sikeres bejelentkezés", user});
        }
        catch (error) {
            console.error("Hiba a bejelentkezés során!", error)
            res.status(500).json({error : "Internal server error!"})
        }
    }


}

export default userController