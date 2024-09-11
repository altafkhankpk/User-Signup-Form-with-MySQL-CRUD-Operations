import Image from "next/image";
import styles from "./page.module.css";
// import Login from "./login/login";
// import HomeTest from "./Test/page";
import Signup from "./signup/page";

export default function Home() {
  return (
    <main >
      {/* <Login></Login> */}
      <Signup></Signup>
      {/* <HomeTest></HomeTest> */}
    </main>
  );
}
