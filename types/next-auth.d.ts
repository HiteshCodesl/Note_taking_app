import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}

interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}