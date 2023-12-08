// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./customer-auth.css";

const Customerauth = () => {
  localStorage.removeItem("userID");
  localStorage.removeItem("name");
  localStorage.removeItem("HTML5_QRCODE_DATA");
  const navigate = useNavigate();
  const api = "http://localhost:3000";
  const [isSignUp, setisSignUp] = useState(true);
  const [FullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    setisSignUp(!isSignUp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        isSignUp ? `${api}/users/register` : `${api}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            FullName: FullName,
            userName: userName,
            password: password,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        localStorage.setItem("userID", data._id);
        navigate("/home");
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    // <div className="Customerauth">
    //   {isSignUp ? (
    //     <form onSubmit={handleSubmit}>
    //       <div className="top">
    //         <h1>New Customer</h1>
    //       </div>
    //       <div className="middle">
    //         <p>FullName:</p>
    //         <input
    //           type="text"
    //           placeholder="Your Name"
    //           name="FullName"
    //           value={FullName}
    //           onChange={(e) => setFullName(e.target.value)}
    //         />
    //         <p>UserName:</p>
    //         <input
    //           type="text"
    //           placeholder="UserName"
    //           name="userName"
    //           value={userName}
    //           onChange={(e) => setUserName(e.target.value)}
    //         />
    //         <p>Password:</p>
    //         <input
    //           type="password"
    //           placeholder="Password"
    //           name="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </div>
    //       <div className="bottom">
    //         <button type="button" onClick={handleSignUp}>
    //           Already have an account?
    //         </button>
    //         <button type="submit" id="signup">
    //           SignUp
    //         </button>
    //       </div>
    //     </form>
    //   ) : (
    //     <form onSubmit={handleSubmit}>
    //       <div className="top">
    //         <h1>Customer Login</h1>
    //       </div>
    //       <div className="middle">
    //         <p>UserName:</p>
    //         <input
    //           type="text"
    //           placeholder="UserName"
    //           name="userName"
    //           value={userName}
    //           onChange={(e) => setUserName(e.target.value)}
    //         />
    //         <p>Password:</p>
    //         <input
    //           type="password"
    //           placeholder="Password"
    //           name="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </div>
    //       <div className="bottom">
    //         <button onClick={handleSignUp}>Don't have an account?</button>
    //         <button type="submit" id="login">
    //           Login
    //         </button>
    //       </div>
    //     </form>
    //   )}
    // </div>
    <div className="font-[Poppins] w-[100vw] h-[100vh] bg-[#e4e4e4] flex items-center justify-center">
      {isSignUp ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white md:w-[480px] md:h-[900px] sm:w-full sm:h-full rounded-[5px] box-shadow md:flex md:flex-col md:items-center md:justify-normal sm:flex sm:flex-col sm:items-center sm:justify-center py-4 px-8"
        >
          <div className="mb-[1.2rem]">
            <h1 className="font-bold text-[2rem] mb-[1.2rem]">New Customer</h1>
          </div>
          <div className="mb-[1.2rem]">
            <p className="text-[1.25rem]">FullName:</p>
            <input
              type="text"
              placeholder="Your Name"
              name="FullName"
              value={FullName}
              className="p-[0.75rem] mb-[1rem] input-box-shadow"
              onChange={(e) => setFullName(e.target.value)}
            />
            <p className="text-[1.25rem]">UserName:</p>
            <input
              type="text"
              placeholder="UserName"
              name="userName"
              value={userName}
              className="p-[0.75rem] mb-[1rem] input-box-shadow"
              onChange={(e) => setUserName(e.target.value)}
            />
            <p className="text-[1.25rem]">Password:</p>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              className="p-[0.75rem] mb-[1rem] input-box-shadow"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <button
              type="button"
              className="text-[1rem] mt-[0.5rem]"
              onClick={handleSignUp}
            >
              Already have an account?
            </button>
            <button
              type="submit"
              className="bg-black text-white text-[1.2rem] p-[0.4rem] rounded-[5px] cursor-pointer mt-[0.5rem]"
              id="signup"
            >
              SignUp
            </button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white md:w-[480px] md:h-[900px] sm:w-full sm:h-full rounded-[5px] box-shadow md:flex md:flex-col md:items-center md:justify-center lg:justify-normal sm:flex sm:flex-col sm:items-center sm:justify-center py-4 px-8"
        >
          <div className="mb-[1.2rem]">
            <h1 className="font-bold text-[2rem] mb-[1.2rem]">
              Customer Login
            </h1>
          </div>
          <div className="mb-[1.2rem]">
            <p className="text-[1.25rem]">UserName:</p>
            <input
              type="text"
              placeholder="UserName"
              name="userName"
              value={userName}
              className="p-[0.75rem] mb-[1rem] input-box-shadow"
              onChange={(e) => setUserName(e.target.value)}
            />
            <p>Password:</p>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              className="p-[0.75rem] mb-[1rem] input-box-shadow"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <button
              type="button"
              className="text-[1rem] mt-[0.5rem]"
              onClick={handleSignUp}
            >
              Don't have an account?
            </button>
            <button
              type="submit"
              className="bg-black text-white text-[1.2rem] p-[0.4rem] rounded-[5px] cursor-pointer mt-[0.5rem]"
              id="signup"
            >
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Customerauth;
