import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useState } from "react";

const Signup = () => {
    const { onLogin } = useAuth();
    const navigate = useNavigate();
    const [signupRequest, setSignupRequest] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignupRequest((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate password match
        if (signupRequest.password !== signupRequest.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        // Validate all fields are filled
        if (!signupRequest.fullname || !signupRequest.email || !signupRequest.password) {
            toast.error("Please fill in all fields.");
            return;
        }

        // Get existing users from localStorage
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        
        // Check if email already exists
        const userExists = existingUsers.some((user: any) => user.email === signupRequest.email);
        if (userExists) {
            toast.error("User with this email already exists");
            return;
        }

        // Add new user to localStorage
        const newUser = {
            fullname: signupRequest.fullname,
            email: signupRequest.email,
            password: signupRequest.password
        };
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));

        // Create token and log in
        const token = "jwt-token-" + Date.now();
        localStorage.setItem("auth_token", token);
        onLogin?.(token);
        toast.success("Signed up successfully!");
        navigate("/");
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                    Create your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSignup}>
                    <div>
                        <label
                            htmlFor="fullname"
                            className="block text-sm/6 font-medium text-gray-100"
                        >
                            Full Name
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={handleChanges}
                                id="fullname"
                                name="fullname"
                                type="text"
                                required
                                autoComplete="name"
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm/6 font-medium text-gray-100"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={handleChanges}
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm/6 font-medium text-gray-100"
                        >
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={handleChanges}
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="new-password"
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-100">
                            Confirm password
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={handleChanges}
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                autoComplete="new-password"
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-400">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;