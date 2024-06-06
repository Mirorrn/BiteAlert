import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: ["nail-biting"],
        autoStart: true,
        loop: true,
        deleteSpeed: 0.5,
      }}
    />
  );
}

export default Type;
