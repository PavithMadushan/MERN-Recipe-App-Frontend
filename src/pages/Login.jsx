// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// function Login() {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prevForm) => ({ ...prevForm, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!form.email || !form.password) {
//       setError("Please enter both email and password.");
//     } else {
//       setError("Your password or username is incorrect");
//       // Handle login logic here
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold">Login</h1>
//           <img src="https://via.placeholder.com/50x50" alt="Logo" className="mx-auto my-4 w-12 h-12" />
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium">Email address</label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               placeholder="john@gmail.com"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               className={`w-full p-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-md`}
//               placeholder="********"
//             />
//             {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 bg-rose-500 text-white rounded-md font-semibold hover:bg-rose-600 transition"
//           >
//             SIGN IN
//           </button>
//           <p className="text-center text-sm mt-4">Don&apos;t have an account? <Link to="/signup" className="text-rose-500 hover:underline">Create an account</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
    } else {
      try {
        // Send a POST request to login the user
        const response = await axios.post("http://localhost:5000/api/user/login", {
          email: form.email,
          password: form.password,
        });

        // Check if login was successful
        if (response.data.success) {
          // Store the JWT token in local storage
          localStorage.setItem("token", response.data.data);

          // Redirect to the home page or dashboard after login
          navigate("/"); // Replace "/dashboard" with your desired route
        } else {
          // Display error message from backend if login failed
          setError(response.data.message);
        }
      } catch (err) {
        // Show error message if there's a network or server error
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Login</h1>
          <img src="https://via.placeholder.com/50x50" alt="Logo" className="mx-auto my-4 w-12 h-12" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="john@gmail.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full p-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-md`}
              placeholder="********"
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-rose-500 text-white rounded-md font-semibold hover:bg-rose-600 transition"
          >
            SIGN IN
          </button>
          <p className="text-center text-sm mt-4">
            Don&apos;t have an account? <Link to="/signup" className="text-rose-500 hover:underline">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
