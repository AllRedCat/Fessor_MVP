import { Timestamp } from "firebase/firestore";

export interface Student {
    name: string;
    class: string;
    schoolId: string;
    birthDate: Timestamp
}