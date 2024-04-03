import { Box, HStack, Center, Image, Button, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { VStack, FormControl, Input, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const formStyle = {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  };

  const btnStyle = {
    borderRadius: "100px",
  };

  const userInputStyle = {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    borderRadius: "100px",
  };

  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    console.log("kkkkkkkk");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
        try {
            const response = await axios.post("https://play-listener-application-server.onrender.com/login", {
                email,
                password,
            });
            console.log(response.data.message);
            console.log(response.data.user.email);
            // Handle success (e.g., set login status or redirect to dashboard)
            // Store email in localStorage
            localStorage.setItem('email', response.data.user.email);
            window.alert("Login successful!");
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    } else {
        console.log("Please fill out all required fields");
    }
};


  return (
    <Center>
      <HStack p={4} w="65%">
        <Box
          style={formStyle}
          w="45%"
          h="auto"
          className="signupForm"
          p={5}
          pt={5}
          pb={10}
        >
          <Box>
            <Center>
              {/* <Image
                w="120px"
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
                alt="logo"
                mb="20px"
              /> */}
            
            <Text fontSize="3xl" as="b">
              {" "}
              Welcome Back
            </Text>
            </Center>
            <Text fontSize="md" color="gray">
              Don't you have an account ?
              <Link href="/signup" color="green">
                {" "}
                Sign up{" "}
              </Link>
            </Text>
            <VStack w="100%" mt="20px" p={1}>
              {/* <Button
                onClick={handleLogin}
                w="100%"
                bg="white"
                style={btnStyle}
                className="signUpbtn"
              >
                <FcGoogle fontSize="2xl" mr="10px" /> Log in with Google
              </Button> */}
              <Spacer />
              {/* <Button
                w="100%"
                bg="white"
                style={btnStyle}
                className="signUpbtn"
              >
                {" "}
                <RxGithubLogo fontSize="2xl" mr="10px" />
                Log in with Github
              </Button> */}
            </VStack>
          </Box>
          <Box w="90%" margin="auto" mt="20px">
            <Box
              bgColor="#fff"
              w="169px"
              pl="10px"
              pr="10px"
              m="auto"
              fontSize="sm"
              color="#998b8b"
              pos="relative"
              top="9px"
            >
              <Text> Or Log in with Email</Text>
            </Box>
            <hr style={{ borderColor: "#ded1d1" }} />
          </Box>
          <FormControl h="auto" mt="20px">
            <Input
             id="email"
             style={userInputStyle}
             type="email"
             placeholder="Enter your email"
             mt="20px"
             />
            <br />
            <Input
             id="password"
              style={userInputStyle}
              type="password"
              placeholder="Enter your password"
              mt="20px"
            />
            <Link pos="absolute" right="0" mt="70px">
              {" "}
              Forget Password ?
            </Link>
            <br />
            <Button
              onClick={handleLogin}
              bg="black"
              color="white"
              style={btnStyle}
              w="100%"
              mt="50px"
              type="submit"
              _hover={{ bg: "#1ed760" }}
            >
              {" "}
              Log in{" "}
            </Button>
          </FormControl>
          {loginSuccess && (
            <Text mt="20px" color="green">
              Login successful!
            </Text>
          )}
        </Box>
        <Box>
          <Image
            w="500px"
            src="https://media4.giphy.com/media/3oz8xWbLkqdlJf7qQE/giphy.gif?cid=ecf05e4706l8on0bjaekgf3i89spcnq3y6mm8lecc2j5gbu3&rid=giphy.gif&ct=g"
            alt="sing-illus"
          />
        </Box>
      </HStack>
    </Center>
  );
};
export { Login };


// import { Box, HStack, Center, Image, Button, Link, Text } from "@chakra-ui/react";
// import { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { RxGithubLogo } from "react-icons/rx";
// import { VStack, FormControl, Input, Spacer } from "@chakra-ui/react";
// import axios from "axios";

// const Login = () => {
//   const formStyle = {
//     boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
//   };

//   const btnStyle = {
//     borderRadius: "100px",
//   };

//   const userInputStyle = {
//     boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
//     borderRadius: "100px",
//   };

//   const [loginSuccess, setLoginSuccess] = useState(false);
//   const [loginId, setLoginId] = useState(null);

//   const handleLogin = async () => {
//     console.log("kkkkkkkk");
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     if (email && password) {
//         try {
//             const response = await axios.post("https://play-listener-application-server.onrender.com/login", {
//                 email,
//                 password,
//             });
//             console.log(response.data.message);
//             setLoginId(email); // Store the login ID in state
//             setLoginSuccess(true); // Set login success to true
//             // Handle success (e.g., set login status or redirect to dashboard)
//             window.alert("Login successful!");
//         } catch (error) {
//             console.error(error);
//         }
//     } else {
//         console.log("Please fill out all required fields");
//     }
//   };

//   const handleLogout = () => {
//     setLoginId(null); // Clear the login ID
//     setLoginSuccess(false); // Set login success to false
//     // Add any other necessary logout logic (e.g., redirect to login page)
//     window.alert("Logged out successfully!");
//   };

//   return (
//     <Center>
//       <HStack p={4} w="65%">
//         <Box
//           style={formStyle}
//           w="45%"
//           h="auto"
//           className="signupForm"
//           p={5}
//           pt={5}
//           pb={10}
//         >
//           <Box>
//             <Center>
//               {/* <Image
//                 w="120px"
//                 src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
//                 alt="logo"
//                 mb="20px"
//               /> */}
            
//             <Text fontSize="3xl" as="b">
//               {" "}
//               Welcome Back
//             </Text>
//             </Center>
//             <Text fontSize="md" color="gray">
//               Don't you have an account ?
//               <Link href="/signup" color="green">
//                 {" "}
//                 Sign up{" "}
//               </Link>
//             </Text>
//             <VStack w="100%" mt="20px" p={1}>
//               {/* <Button
//                 onClick={handleLogin}
//                 w="100%"
//                 bg="white"
//                 style={btnStyle}
//                 className="signUpbtn"
//               >
//                 <FcGoogle fontSize="2xl" mr="10px" /> Log in with Google
//               </Button> */}
//               <Spacer />
//               {/* <Button
//                 w="100%"
//                 bg="white"
//                 style={btnStyle}
//                 className="signUpbtn"
//               >
//                 {" "}
//                 <RxGithubLogo fontSize="2xl" mr="10px" />
//                 Log in with Github
//               </Button> */}
//             </VStack>
//           </Box>
//           <Box w="90%" margin="auto" mt="20px">
//             <Box
//               bgColor="#fff"
//               w="169px"
//               pl="10px"
//               pr="10px"
//               m="auto"
//               fontSize="sm"
//               color="#998b8b"
//               pos="relative"
//               top="9px"
//             >
//               <Text> Or Log in with Email</Text>
//             </Box>
//             <hr style={{ borderColor: "#ded1d1" }} />
//           </Box>
//           <FormControl h="auto" mt="20px">
//             <Input
//              id="email"
//              style={userInputStyle}
//              type="email"
//              placeholder="Enter your email"
//              mt="20px"
//              />
//             <br />
//             <Input
//              id="password"
//               style={userInputStyle}
//               type="password"
//               placeholder="Enter your password"
//               mt="20px"
//             />
//             <Link pos="absolute" right="0" mt="70px">
//               {" "}
//               Forget Password ?
//             </Link>
//             <br />
//             <Button
//               onClick={handleLogin}
//               bg="black"
//               color="white"
//               style={btnStyle}
//               w="100%"
//               mt="50px"
//               type="submit"
//               _hover={{ bg: "#1ed760" }}
//             >
//               {" "}
//               Log in{" "}
//             </Button>
//           </FormControl>
//           {loginSuccess && (
//             <>
//               <Text mt="20px" color="green">
//                 Login successful! Welcome, {loginId}!
//               </Text>
//               <Button
//                 onClick={handleLogout}
//                 bg="black"
//                 color="white"
//                 style={btnStyle}
//                 w="100%"
//                 mt="20px"
//                 _hover={{ bg: "#1ed760" }}
//               >
//                 {" "}
//                 Logout{" "}
//               </Button>
//             </>
//           )}
//         </Box>
//         <Box>
//           <Image
//             w="500px"
//             src="https://media4.giphy.com/media/3oz8xWbLkqdlJf7qQE/giphy.gif?cid=ecf05e4706l8on0bjaekgf3i89spcnq3y6mm8lecc2j5gbu3&rid=giphy.gif&ct=g"
//             alt="sing-illus"
//           />
//         </Box>
//       </HStack>
//     </Center>
//   );
// };
// export { Login };
