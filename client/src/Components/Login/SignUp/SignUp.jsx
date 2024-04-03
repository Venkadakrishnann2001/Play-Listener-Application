// // Signup.js

// import React, { useState } from "react";
// import { Box, HStack, Center, Button, Input, FormControl } from "@chakra-ui/react";
// import { useNavigate } from "react-router";
// import axios from "axios";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSignup = async () => {
//     try {
//       const response = await axios.post("/signup", formData);
//       console.log(response.data.message); // You can handle success message as needed
//       navigate("/login"); // Redirect to login page after successful signup
//     } catch (error) {
//       console.error("Error signing up:", error.response.data.message);
//       // Handle error, e.g., display error message to user
//     }
//   };

//   return (
//     <Center>
//       <HStack p={4} w="65%">
//         <FormControl>
//           <Input
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             type="text"
//             placeholder="Username"
//             mt="20px"
//             required
//           />
//           <Input
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             type="email"
//             placeholder="Enter your email"
//             mt="20px"
//             required
//           />
//           <Input
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             type="password"
//             placeholder="Enter your password"
//             mt="20px"
//             required
//           />
//           <Button
//             onClick={handleSignup}
//             bg="#1ed760"
//             color="white"
//             w="100%"
//             mt="50px"
//             type="button"
//             _hover={{ bg: "red" }}
//           >
//             GET STARTED
//           </Button>
//         </FormControl>
//       </HStack>
//     </Center>
//   );
// };

// export { Signup };



import { Box, HStack, Center, Image, Button, Link, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { VStack, FormControl, Input, Spacer } from "@chakra-ui/react";

const Signup = () => {
  const navigate = useNavigate();
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

  let helper = 0;

  let formImg0 =
    "https://wpimg.pixelied.com/blog/wp-content/uploads/2021/06/15134408/Spotify-Cover-Art-Size-Featured-Image.png";
  let formImg1 =
    "https://img.freepik.com/free-vector/more-music-concept-illustration_114360-1466.jpg?w=740&t=st=1681748328~exp=1681748928~hmac=6e7fcd6ad7824baf374697190acedf5479f94246fe1e02502714f5f4a2cc4bd0";
  let formImg2 =
    "https://img.freepik.com/free-vector/music-concept-illustration_114360-1425.jpg?w=740&t=st=1681748295~exp=1681748895~hmac=d52a6fd1ed37b159772117e00c57ccaff21f68a8614350aaba8f52434e588961";
  let formImg3 =
    "https://www.usmobile.com/blog/wp-content/uploads/2017/02/Spotify-hacks-4-800x524.png";

  let formImages = [formImg0, formImg1, formImg2, formImg3];
  const [realImg, setRealImg] = useState({
    img: formImages[0],
    count: 1,
  });
  const changeImg = () => {
    helper++;
    if (helper === formImages.length) {
      helper = 0;
    }
    setRealImg({ img: formImages[helper], count: helper + 1 });
  };
  useEffect(() => {
    let intervalId = setInterval(changeImg, 6000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const AUTH_GOOGLE = `${import.meta.env.VITE_HOME_URL}/auth/google`;

  const handleGetStarted = async () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (username && email && password) {
      try {
        // console.log("check");
        const response = await axios.post("https://play-listener-application-server.onrender.com/signup", {
          username,
          email,
          password,
        });
        console.log(response.data.message);
        navigate("/login");
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
              Get Started
            </Text>
            </Center>
            <Text fontSize="md" color="gray" marginRight={'4px'}>
              already have an account ?
              <Link href="/login" color="green">
                {" "}
                Login{" "}
              </Link>
            </Text>
            <VStack w="100%" mt="20px" p={1}>
              <Link color="teal.500" href={AUTH_GOOGLE} w="100%" bg="white">
                {/* <Button
                  onClick={handleGetStarted}
                  w="100%"
                  bg="white"
                  className="signUpbtn"
                  style={btnStyle}
                >
                  <FcGoogle fontSize="2xl" mr="10px" /> Sign up with Google
                </Button> */}
              </Link>

              <Spacer />
              {/* <Button
                w="100%"
                bg="white"
                style={btnStyle}
                className="signUpbtn"
              >
                <RxGithubLogo fontSize="2xl" mr="10px" />
                Sign up with Github
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
              <Text> Or Sign up with Email</Text>
            </Box>
            <hr style={{ borderColor: "#ded1d1" }} />
          </Box>
          <FormControl h="auto" mt="20px">
            <Input
              id="username"
              style={userInputStyle}
              type="text"
              placeholder="Username"
              mt="20px"
              required
            />
            <Spacer />
            <Input
              id="email"
              style={userInputStyle}
              type="email"
              placeholder="Enter your email"
              mt="20px"
              required
            />
            <br />
            <Input
              id="password"
              style={userInputStyle}
              type="password"
              placeholder="Enter your password"
              mt="20px"
              required
            />

            <Button
              onClick={()=>handleGetStarted()}
              bg="#1ed760"
              color="white"
              style={btnStyle}
              w="100%"
              mt="50px"
              type="button"
              _hover={{ bg: "red" }}
            >
              {" "}
              GET STARTED{" "}
            </Button>
          </FormControl>
        </Box>
        <Box>
          <Image w="500px" src={realImg.img} alt="sing-illus" />
        </Box>
      </HStack>
    </Center>
  );
};

export { Signup };
