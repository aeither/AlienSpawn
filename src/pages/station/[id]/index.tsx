import { type NextPage } from "next";
import { useRouter } from "next/router";
import CardDetail from "../../../components/CardDetail";
import Navbar from "../../../components/Navbar";
const Station: NextPage = () => {
  const {
    query: { id },
  } = useRouter();

  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-neutral-dark">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 ">
          <div className="flex w-full items-center justify-between pb-12">
            <div>
              <h1 className="text-5xl font-extrabold italic tracking-tight text-white sm:text-[5rem]">
                Alien Station {id}
              </h1>
              <p className="pt-4 text-lg text-neutral-light">
                Nocode tool for minting NFT game assets.
              </p>
            </div>
            <div>Image</div>
          </div>
          <CardDetail />
        </div>
      </main>
    </>
  );
};

export default Station;
