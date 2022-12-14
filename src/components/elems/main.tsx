import { resolveTxn } from "@/utils/resolveTxn";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Transaction } from "@solana/web3.js";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";

const MainElem: FC = () => {
  const [val, setVal] = useState<string>("");
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const { mutate, isLoading } = useMutation(
    ["resolveTxn"],
    async () => {
      const res = await resolveTxn(val);
      const transaction = Transaction.from(
        Buffer.from(res.transaction, "base64")
      );

      const signature = await sendTransaction(transaction, connection, {
        skipPreflight: true,
        maxRetries: 3,
      });

      return signature;
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate();
      }}
    >
      <Flex
        py="10"
        px="16"
        rounded="md"
        bg="white"
        direction="column"
        alignItems="center"
        gap="4"
      >
        <Text fontSize="xl" fontWeight="700">
          Simulate a Solana Pay Txn
        </Text>

        <FormControl>
          <FormLabel>
            <Text fontSize="md" fontWeight="500" color="gray.600">
              Solana Pay URL
            </Text>
          </FormLabel>
          <Input
            fontFamily="dm"
            placeholder="Solana Pay URL goes here..."
            w="lg"
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
            }}
            isRequired
          />
        </FormControl>

        {publicKey ? (
          <Button
            px="8"
            h="10"
            rounded="full"
            fontWeight="500"
            bg="#8f64f2"
            _hover={{}}
            _active={{}}
            _focus={{}}
            color="white"
            isLoading={isLoading}
            type="submit"
          >
            Simulate
          </Button>
        ) : (
          <WalletMultiButton />
        )}
      </Flex>
    </form>
  );
};

export { MainElem };
