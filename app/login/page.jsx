"use client";
import { redirect } from "@/node_modules/react-router-dom/dist/index";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        // Hardcoded credentials for login feature
        const mockUser = {
            email: "test@example.com",
            password: "12345",
        };

        // Validate credentials
        if (email === mockUser.email && password === mockUser.password) {
            alert("Login successful!");
            window.location.href = "/"; // Redirect to Dashboard. (Subject to change)
        } else {
            alert("Invalid email or password!");
        }
    };
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="email">Email</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="fixed-width"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="password">Password</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="fixed-width"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="align-right">
                                <button>Submit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    );
}