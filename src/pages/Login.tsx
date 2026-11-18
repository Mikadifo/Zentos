import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "./../assets/loginBg.webp";
import logo from "./../assets/logo.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { AiOutlineArrowRight } from "react-icons/ai";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/", { replace: true });
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="absolute h-full w-full">
      <img
        src={loginBg}
        alt="Zentos bg"
        className="fixed w-full h-full object-cover -z-10"
      />

      <div className="bg-zento-white rounded-xl p-16 w-150 flex flex-col items-center justify-center relative left-1/2 top-1/2 -translate-1/2 z-20">
        <img src={logo} alt="logo" className="w-full" />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-16 w-full"
        >
          <input
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="Email"
            required
            className="rounded-xl py-2 px-4 border border-zento-blue w-full"
          />

          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Password"
            required
            className="rounded-xl py-2 px-4 border border-zento-blue w-full"
          />

          <button
            type="submit"
            className="rounded-xl mt-4 bg-zento-blue text-zento-white font-bold py-2 px-4 w-full flex gap-2.5 items-center justify-center cursor-pointer"
          >
            Login
            <AiOutlineArrowRight />
          </button>
        </form>
      </div>

      <span className="text-sm text-zento-white opacity-64 relative bottom-8 left-1/2 -translate-1/2 z-20">
        Photo by{" "}
        <a href="https://unsplash.com/@ricvath?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
          Richard Horvath
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/photos/deep-blue-and-purple-flowing-shapes-_nWaeTF6qo0?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
          Unsplash
        </a>
      </span>
    </main>
  );
}

export default Login;
