import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import "./signup.css";
// Assume you have a backend API endpoint for GID verification
// const backendAPI = "https://your-backend-api.com/verifyGID";

// const verifyGID = async (gid) => {
//   try {
//     const response = await fetch(backendAPI, {
//       method: "POST", // or "GET" depending on your backend API
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ gid }),
//     });

//     if (!response.ok) {
//       throw new Error("GID verification failed");
//     }

//     const data = await response.json();
//     return data.isValid; // Assume the backend sends a JSON response with an 'isValid' property
//   } catch (error) {
//     console.error("Error verifying GID:", error);
//     return false;
//   }
// };

const SignUp = () => {
  const [inputList, setinputList] = useState([{ name: "" }]);

  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
  };

  const handleremove=index=>{
    const list=[...inputList];

    list.splice(index,1);
    setinputList(list);

  }

  const handleaddclick = () =>{
    if (inputList.length < 2){
      setinputList([...inputList, { name: "" }]);
    } else {
      alert("You can only add up to 2 names");
    }
  };
// Inside your component
// const handleaddclick = async () => {
//   if (inputList.length < 2) {
//     const lastInput = inputList[inputList.length - 1];
//     const isGIDValid = await verifyGID(lastInput.name);

//     if (isGIDValid) {
//       setinputList([...inputList, { name: "" }]);
//     } else {
//       alert("Invalid GID. Please enter a valid GID.");
//     }
//   } else {
//     alert("You can only add up to 6 names");
//   }
// };


  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "79474543031-tmjo35916ufn421ej3u1i2ljao2apr4s.apps.googleusercontent.com",
        scope: "",
      });
    }
    gapi.load("client: auth2", start);
  });

  const [popupStyle, showPopup] = useState("hide");

  const popup = () => {
    showPopup("login-popup");
    setTimeout(() => showPopup("hide"), 3000);
  };

  const onSuccess = (e) => {
    alert("User signed in");
    console.log(e);
  };

  const onFailure = (e) => {
    alert("User sign in Failed");
    console.log(e);
  };

  return (
    <div className="cover">
      <h1>CODING</h1>
      <div className="underline"></div>
      <div className="icon">
        <i class="fa fa-user-o" aria-hidden="true"></i>
        <input name="team" type="text" placeholder="Team Name" />
      </div>
      
      {inputList.map((x, i) => {
        return (
          <div className="icon">
            <i class="fa fa-id-card-o" aria-hidden="true"></i>
            <input
              name="name"
              type="text"
              placeholder={`GID ${i+1}`}
              onChange={(e) => handleinputchange(e, i)}
            />
            



            {inputList.length !== 1 && (
              <button class="fa fa-minus"  onClick={()=> handleremove(i)}></button>
            )}
            {inputList.length - 1 === i && (
              <button class="fa fa-plus" onClick={handleaddclick}></button>
            )}
            <button className="Verify">Verify</button>

          </div>
        );
      })}

      <div className="icon">
        <i class="fa fa-id-card-o" aria-hidden="true"></i>

        <input name="college" type="text" placeholder="TID" />
        <button className="Verify">Verify</button>
      </div>
      {/* <div className="icon">
        <i class="fa fa-calendar" aria-hidden="true"></i>

        <input name="year" type="number" placeholder="Year of studying" />
      </div>
      <div className="icon">
        <i class="fa fa-book" aria-hidden="true"></i>

        <input name="department" type="text" placeholder="Department" />
      </div>
      <div className="icon">
        <i class="fa fa-id-card-o" aria-hidden="true"></i>

        <input name="roll" type="number" placeholder="Roll No." />
      </div>
      <div className="icon">
        <i class="fa fa-envelope-o" aria-hidden="true"></i>

        <input name="email" type="email" placeholder="Email id" />
      </div>
      <div className="icon">
        <i class="fa fa-mobile" aria-hidden="true"></i>

        <input name="phoneNumber" type="tel" placeholder="Phone Number" />
      </div> */}

      <div className="login-btn" onClick={popup}>
        Pay now
      </div>

      {/* <p className="text" >Or sign up using</p> */}

      {/* <div className={popupStyle}>
                <h3>Login Failed</h3>
                <p>Username or password incorrect</p>
            </div> */}
    </div>
  );
};

export default SignUp;
