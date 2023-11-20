import { useState, useEffect } from "react";
import Script from "next/script";
import PropTypes from "prop-types";

const SITE_KEY = "6LdjehUpAAAAAHfFJQtfqLkD09l24Hc3ofqGAVOD"

export default function Enterprise() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [submit, setSubmit] = useState("REGISTER");
  const [result, setResult] = useState({});

  useEffect(() => {
    setSubmit(() => {
      if (completed) return "RESET";
      if (processing) return "PROCESSING";
      return "REGISTER";
    });
  }, [processing, completed]);

  const handleSubmit = (e) => {
    //
    e.preventDefault();

    if (completed) {
      setCompleted(false);
      setName("");
      setEmail("");
      setResult({});
    } else {
      setProcessing(true);

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(SITE_KEY, { action: "submit" })
          .then(async (token) => {
            /* send data to the server */
            const body = {
              name,
              email,
              recaptchaResponse: token,
            };

            try {
              const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json;charset=utf-8" },
                body: JSON.stringify(body),
              });
              if (response.ok) {
                const json = await response.json();
                setResult(json);
                setCompleted(true);
              } else {
                throw new Error(response.statusText);
              }
            } catch (error) {
              setResult({ message: error.message });
            }
          })
          .catch((error) => {
            setResult({ message: error.message });
          });
        setProcessing(false);
      });
    }
  }

  return (
    <>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`} />

      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold bg-black text-center mb-4">reCaptcha v3</h1>

          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="name"
                required
                value={name}
                disabled={processing || completed}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                id="email"
                required
                value={email}
                disabled={processing || completed}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <input
                className={`btn ${processing || !name || !email ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out`}
                type="submit"
                value={submit}
                disabled={!name || !email || processing}
              />
            </div>
          </form>
          <DisplayResult result={result} />
        </div>
      </main>
    </>
  );
}

const DisplayResult = ({ result }) => (
  <>
    {result && Object.keys(result).length > 0 && result.constructor === Object && (
      <div
        className={`p-4 rounded ${result.success ? 'bg-green-100 border-green-400 text-black' : 'bg-red-100 border-red-400 text-black'} border-l-4`}
      >
        <div className="font-medium">{`Registration ${
          result.success ? "successful" : "failed"
        }`}</div>
        <pre className="text-sm">{JSON.stringify(result, undefined, 2)}</pre>
      </div>
    )}
  </>
);

DisplayResult.propTypes = {
  result: PropTypes.shape({}).isRequired,
};
