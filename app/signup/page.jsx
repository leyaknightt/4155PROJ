"use client";

import React, { useState } from "react";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

    const handleSignUp = (e) => {
        e.preventDefault();

        // Simple validation
        if (password !== repassword) {
            alert("Passwords do not match!");
            return;
        }

        localStorage.setItem('user', JSON.stringify({email, password}));
         // Check if email already exists
        //  const userExists = mockUsers.some((user) => user.email === email);
        //  if (userExists) {
        //      alert("Email already registered!");
        //      return;
        //  }

        // const newUser = { email, password };
        // mockUsers.push(newUser);
        // console.log("Registered Users:", mockUsers);

         alert("Signup successful! Please log in.");

        // // Simulate saving user info (you can replace this with an API call)
        // console.log("User registered with email:", email);

        // // Redirect to login
        window.location.href = "/login";
    };
    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit ={handleSignUp}>
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
                            <td>
                                <label htmlFor="repassword"> Re-Enter Password</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="repassword"
                                    name="repassword"
                                    value={repassword}
                                    onChange={(e) => setRepassword(e.target.value)}
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