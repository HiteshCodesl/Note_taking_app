"use client"
import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";
import { useState } from "react";

export default function SignupPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signup = async () => {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: { "Content-Type": "application/json" }
        })
        if(res.ok) {
            await signIn("credentials", {
                name,
                email,
                password,
                callbackUrl: "/"
            })
        } else {
            NextResponse.json("signup failed")
        }
    }
    return (
        <div className="m-10 p-10
        bg-black text-whhite">
            <h1 className="text-white mb-10 flex justify-center text-2xl">signup</h1>
            <div className="flex flex-col gap-8 text-black p-4">
            <input className="p-3 text-black" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
            <input className="p-3 text-black" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
            <input className="p-3 text-black" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
            <button className="text-white text-lg border border-white p-2" onClick={signup}>Signup</button>
            </div>
        </div>
    )


}