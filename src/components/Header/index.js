import { useMoralis } from "react-moralis";
import { useState } from "react";
import {
  Button,
  Badge,
  Stack,
  HStack,
  Grid,
  Flex,
  Spacer,
  Text,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import { DropButton } from "grommet";

import { truncateAddress } from "../../utils/shortAddy";

export default function Header() {
  const {
    authenticate,
    isAuthenticated,
    logout,
    user,
    isWeb3Enabled,
    enableWeb3,
  } = useMoralis();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <Flex>
            <Text mt="5" fontSize="4xl">
              ColorPixels
            </Text>
            <Spacer />
            <HStack>
              <Link href="/">
                <DropButton label="Explore"></DropButton>
              </Link>
              <Link href="/PostForm">
                <DropButton label="Mint"></DropButton>
              </Link>
              <Link href="/Profile">
                <DropButton label="Profile"></DropButton>
              </Link>
            </HStack>
            <Spacer />
            <HStack p="4">
              {/* <h2>Welcome {user.get("username")}</h2> */}
              {/* <h1>Logged in as:</h1> */}
              <Badge colorScheme="green">
                <DropButton
                  label={<span>{truncateAddress(user.get("ethAddress"))}</span>}
                  dropAlign={{ top: "bottom", right: "right" }}
                  dropContent={
                    <>
                      <br />
                      <span>Address copying mechanism</span>
                      <Button
                        p="4"
                        mt="2"
                        onClick={() => {
                          navigator.clipboard.writeText(user.get("ethAddress"));
                        }}
                      ></Button>
                    </>
                  }
                />
              </Badge>
              <Button colorScheme="blue" onClick={logout}>
                {" "}
                Logout{" "}
              </Button>
            </HStack>
          </Flex>
        </>
      ) : (
        <Flex>
          <Text mt="4" fontSize="4xl">
            ColorPixels
          </Text>
          <Spacer />

          <Box mt="4" mr="4">
            <DropButton
              label="Log In"
              dropAlign={{ top: "bottom", right: "right" }}
              dropContent={
                <>
                  <Button
                    p="4"
                    mt="2"
                    rounded={false}
                    colorScheme="blue"
                    onClick={() => {
                      authenticate({ provider: "metamask" });
                    }}
                  >
                    Sign in with MetaMask
                  </Button>
                  <Button
                    p="4"
                    mt="2"
                    rounded={false}
                    colorScheme="blue"
                    onClick={() => {
                      authenticate({ provider: "walletconnect", chainId: 137 });
                    }}
                  >
                    Sign in with walletconnect
                  </Button>
                </>
              }
            />
          </Box>
        </Flex>
      )}
    </div>
  );
}
