import { type NextPage } from "next";
import CardList from "../../components/CardList";
import Navbar from "../../components/Navbar";

const Station: NextPage = () => {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-64px)] flex-col bg-neutral-dark">
        <div className="container flex flex-col items-start gap-8 px-4 py-16">
          <div className="flex w-full items-center justify-between pb-12">
            <div>
              <h1 className="text-5xl font-extrabold italic tracking-tight text-white sm:text-[5rem]">
                Station
              </h1>
              <p className="pt-4 text-lg text-neutral-light">
                Prepare your squad of aliens for the battle.
              </p>
            </div>
            <div>Image</div>
          </div>
          <CardList />
        </div>
      </main>
    </>
  );
};

export default Station;
