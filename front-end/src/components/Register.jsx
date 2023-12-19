import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utilities.jsx";
import { useOutletContext } from "react-router-dom";

export const SignUp = () => {
    const { user, setUser } = useOutletContext();
    const [ userName, setUserName ] = useState();
    const [ password, setPassword ] = useState();
    const { login, setLogin } = useOutletContext();

    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();
        let responseUser = await api.post("users/signup", {
            email: userName,
            password: password,
        });
        let user = responseUser.data.user;
        let token = responseUser.data.token;
        console.log(responseUser)
        // Store the token securely (e.g., in localStorage or HttpOnly cookies)
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        // set the user using with useContext to allow all other pages that need user information
        setUser(user);
        // create an inventory for the user
        let responseInventory = await api.post("inventories/inventory_manager/", {
          user: userName
        });
        console.log(responseInventory)
        // navigate("/home"); should probably set this to the user's inventory page
    };

    const flipLogin = () => {
      setLogin(!login);
    }
  
    return (
      <>
        <div className="flex justify-center items-center h-96">
          <div className="bg-white p-4 rounded max-w-md w-96">
            <form onSubmit={(e) => signUp(e)} class="w-full max-w-sm">
              <div class="mb-6">
                <label
                  for="email"
                  class="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                  required=""
                  onChange={(e) => setUserName(e.target.value)} 
                />
              </div>
              <div class="mb-6">
                <label
                  for="password"
                  class="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full"
              >
                <span>Register</span>
              </button>
              {/* <input type="hidden" name="remember" value="true" />
              <p class="mt-8 text-center">
                <a href="/password/reset" class="text-sm hover:underline">
                  Forgot password?
                </a>
              </p> */}
            </form>
          </div>
        </div>
        <footer class="relative shrink-0">
          <div class="space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0">
            <p class="text-center sm:text-left">Already have an account?</p>
            <button
              class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20"
              onClick={flipLogin}
            >
              <span>
                Sign in <span aria-hidden="true">→</span>
              </span>
            </button>
          </div>
        </footer>
      </>
    );
  };
  