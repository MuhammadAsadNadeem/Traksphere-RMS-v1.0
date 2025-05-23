import db from "../db";
import { Repository } from "typeorm";
import { SignUpDto } from "../dto/user.dto";
import config from "../config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entities/user.entity";
import { HttpError } from "../utils/errorHandler";
import { StatusCodes } from 'http-status-codes';
import { BusStop } from "../entities/stop.entity";
import { Message } from "../entities/message.entity";
import { MessageDto } from "../dto/message.dto";

export class authService {
    private userRepository: Repository<User>;
    private busStopRepository: Repository<BusStop>
    private messageRepository: Repository<Message>;

    constructor() {
        this.userRepository = db.user;
        this.busStopRepository = db.busStop;
        this.messageRepository = db.message;
    }

    async signUp(userData: SignUpDto) {
        const { email, password } = userData;

        const userExist = await this.userRepository.findOneBy({ email });
        const hashedPassword = await bcrypt.hash(password, 10);

        if (userExist) {
            if (!userExist.registrationNumber) {
                await this.userRepository.update(userExist.id, { password: hashedPassword });
                return userExist
            }
            throw new HttpError("User already exists", StatusCodes.BAD_REQUEST);
        }

        const newUser = this.userRepository.create({ email, password: hashedPassword });
        await this.userRepository.save(newUser);
        return newUser;
    }

    async findByRegistrationNumber(registrationNumber: string): Promise<User | null> {
        try {

            const user = await this.userRepository.findOne({ where: { registrationNumber } });
            return user;
        } catch (error) {
            throw new Error('There was an error while checking the registration number.');
        }
    }


    async signIn(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new HttpError("User not found", StatusCodes.NOT_FOUND);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new HttpError("Invalid password", StatusCodes.UNAUTHORIZED);
        }

        const token = jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, { expiresIn: config.jwt.exp });

        const { password: _, ...userData } = user;
        return { token };
        // return { token, user: userData };
    }


    async getAllStopNames(): Promise<BusStop[]> {
        try {
            const stops = await this.busStopRepository.find({
                select: ["id", "stopName"]
            });
            return stops;
        } catch (error) {

            throw new HttpError("Error fetching stops", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async sendMessage(data: MessageDto) {
        const { fullName, email, message } = data;

        if (!fullName || !email || !message) {
            throw new HttpError("All fields are required", StatusCodes.BAD_REQUEST);
        }

        try {
            const newMessage = this.messageRepository.create({ fullName, email, message });
            await this.messageRepository.save(newMessage);
            return newMessage;
        } catch (error) {
            throw new HttpError("Error saving message", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllMessages(): Promise<any[]> {
        try {
            const messages = await this.messageRepository.find({
                order: { createdAt: 'DESC' },
            });

            // Convert time to format in PKT
            return messages.map(msg => ({
                ...msg,
                createdAt: new Date(msg.createdAt).toLocaleString('en-PK', {
                    timeZone: 'Asia/Karachi',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                }),
            }));
        } catch (error) {
            throw new HttpError("Error fetching messages", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteMessageById(id: string): Promise<Message> {
        const message = await this.messageRepository.findOneBy({ id });

        if (!message) {
            throw new HttpError("Message not found", StatusCodes.NOT_FOUND);
        }

        await this.messageRepository.delete(id);
        return message;
    }

}

export default new authService();
