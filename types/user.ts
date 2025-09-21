import { Timestamp } from "firebase/firestore";

enum UserRole {
    Teacher = "teacher",
    Secretary = "secretary",
    Admin = "admin"
}

export interface User {
    email: string;
    displayName: string;
    schoolId: string;
    role: UserRole;
    createdAt: Timestamp;
}