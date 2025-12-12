import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

export default function Signup() {
    const { signup } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user"); // default role

    const submit = async (e) => {
        e.preventDefault();
        try {
            await signup({ name, email, password, role });
            // After successful signup, redirect user to the login page
            navigate("/login");

        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        }
    };


    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <h1 className="text-2xl font-bold mb-4">Sign up</h1>

            <form onSubmit={submit} className="space-y-3 bg-white p-4 rounded shadow">

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full border px-3 py-2 rounded"
                />

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full border px-3 py-2 rounded"
                />

                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="w-full border px-3 py-2 rounded"
                />

                {/* Role Input */}
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                </select>

                <button type="submit" className="w-full py-2 bg-green-600 text-white rounded">Create account</button>

                <div className="text-center mt-2">
                    <Link to="/login" className="text-sm text-blue-600">Already have an account? Login</Link>
                </div>
            </form>
        </div>
    );
}
