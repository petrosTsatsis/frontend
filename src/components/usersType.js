import React from "react";
import Typewriter from "typewriter-effect";

function UsersType() {
  return (
    <Typewriter 
      options={{
        strings: [
          "Organize your customers.",
          "Manage your software.",
          "Track your purchases.",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default UsersType;