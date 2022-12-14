import { MainElem } from "@/components/elems/main";
import { genUrl } from "@/utils/genUrl";
import { Box } from "@chakra-ui/react";
import { Keypair } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { data } = useQuery(
    ["url"],
    async () => {
      const res = await genUrl(
        "6siNkftMqXDrhdEHde1sHSKVt19Q5UNfk5C9jjgGJWw5",
        1,
        "So11111111111111111111111111111111111111112",
        Keypair.generate().publicKey,
        "mainnet"
      );
      console.log(res);

      return res;
    },
    {}
  );
  return (
    <Box
      minH="100vh"
      w="full"
      bg="#F2F5F9"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <MainElem />
    </Box>
  );
};

export default Home;
