import { Request, Response } from "express";
import { getAllUsers, createUser } from "../firebase";
import { Admin } from "../models/admin.model";
import { Doctor } from "../models/doctor.model";

const adminController = {
    createDoctor: async (req: Request, res: Response) => {
        const { displayName, email, password } = req.body;

        if (!displayName || !email || !password) {
            return res.status(400).send({ error: 'Missing fields' });
        }

        const users = await getAllUsers();

        let user = users.find((user) => {
            return user.email === email
        });

        if (user) {
            res.status(400).json({ error: "El email ya existe" });
        }

        try {
            const user_Id = await createUser(displayName, email, password, 'doctor');
            const doctor = await Doctor.create({ user_Id })

            return res.status(201).send({
                userId: userId,
            })
        } catch (error) {
            return res.status(500).send({ error: 'Something went wrong' });
        }
    }
}

export default adminController;