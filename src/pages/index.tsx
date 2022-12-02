import { type NextPage } from "next";
import InitiativeList from "../components/InitiativeList";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-64px)] flex-col bg-neutral-dark">
        <div className="container flex flex-col items-start gap-8 px-4 py-16">
          <div className="flex w-full items-center justify-between pb-12">
            <div>
              <h1 className="text-5xl font-extrabold italic tracking-tight text-white sm:text-[5rem]">
                <span className="text-primary">Alien</span> Spawn
              </h1>
              <p className="pt-4 text-lg text-neutral-light">
                Nocode tool for minting NFT game assets.
              </p>
            </div>
            <div>Image</div>
          </div>
          <InitiativeList />
        </div>
      </main>
    </>
  );
};

export default Home;
