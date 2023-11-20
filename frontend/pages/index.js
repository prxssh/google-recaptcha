import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const HomePage = () => {
    const recaptchaRef = useRef(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function verifyCaptcha(token) {
        const res = await axios.post('https://gz-recaptcha.onrender.com/verify-recaptcha', { token: token });
        if (res.data.success) {
            setIsVerified(true);
            alert("Captcha Successful!");
            // Here you can proceed with further form processing
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        setIsFormSubmitted(true);
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline" 
                            id="username" 
                            type="text" 
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 bg-white leading-tight focus:outline-none focus:shadow-outline" 
                            id="password" 
                            type="password" 
                            placeholder="******************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {isFormSubmitted && !isVerified && (
                        <ReCAPTCHA
                            sitekey="6LdmRBUpAAAAAEssRNk4qMHxhe3_w-nK58BLUfao"
                            ref={recaptchaRef}
                            onChange={verifyCaptcha}
                            className="mb-6"
                        />
                    )}
                    <div className="flex items-center justify-between">
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                            type="submit"
                            disabled={!isVerified && isFormSubmitted}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HomePage;
