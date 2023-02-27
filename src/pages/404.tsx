import Link from "next/link";
import { Player } from "@lottiefiles/react-lottie-player";

export default function FourOhFour() {
  return (
      <div>
          <Player
              autoplay
              loop
              src="https://assets2.lottiefiles.com/packages/lf20_kcsr6fcp.json"
              style={{ height: "300px", width: "300px" }}
          /> 
        <Link href="/">
              Go back home
      </Link>
    </div>
  );
}