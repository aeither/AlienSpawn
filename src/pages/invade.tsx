import { type NextPage } from "next";
import Battleground from "../components/Battleground";
import Navbar from "../components/Navbar";

const Invade: NextPage = () => {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-64px)] flex-col bg-neutral-dark">
        <div className="container flex flex-col items-start gap-8 px-4 py-16">
          <div className="flex w-full items-center justify-between pb-12">
            <div>
              <h1 className="text-5xl font-extrabold italic tracking-tight text-white sm:text-[5rem]">
                Space
              </h1>
              <p className="pt-4 text-lg text-neutral-light">
                Dominate the space by eliminating other aliens.
              </p>
            </div>
            <div>
              <img src="svgs/isometric02.svg" alt="" className="w-48" />
            </div>
          </div>
          <Battleground />
        </div>
      </main>
    </>
  );
};

export default Invade;
