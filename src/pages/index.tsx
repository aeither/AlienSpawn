import { type NextPage } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-64px)] flex-col justify-center bg-neutral-dark bg-[url('/bghero.png')]">
        <div className="container flex flex-col  gap-8 px-4 py-16">
          <div className="flex w-full items-center justify-between py-12">
            <div className="w-full items-center text-center">
              <h1 className="text-5xl font-extrabold italic tracking-tight text-white sm:text-[5rem]">
                Play with your custom NFT
              </h1>
              <p className="pt-4 text-lg text-white">
                A no-code dynamic NFT generator battle game on Evmos.
              </p>
            </div>
          </div>
          <div className="w-full text-center">
            <Link href={"/spawn"} className="btn bg-black text-white">
              START
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
