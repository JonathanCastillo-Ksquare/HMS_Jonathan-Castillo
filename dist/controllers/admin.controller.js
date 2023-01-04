"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../firebase");
const doctor_model_1 = require("../models/doctor.model");
const adminController = {
    createDoctor: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { displayName, email, password } = req.body;
        if (!displayName || !email || !password) {
            return res.status(400).send({ error: 'Missing fields' });
        }
        const users = yield (0, firebase_1.getAllUsers)();
        let user = users.find((user) => {
            return user.email === email;
        });
        if (user) {
            res.status(400).json({ error: "El email ya existe" });
        }
        try {
            const user_Id = yield (0, firebase_1.createUser)(displayName, email, password, 'doctor');
            const doctor = yield doctor_model_1.Doctor.create({ user_Id });
            return res.status(201).send({
                userId: userId,
            });
        }
        catch (error) {
            return res.status(500).send({ error: 'Something went wrong' });
        }
    })
};
exports.default = adminController;
