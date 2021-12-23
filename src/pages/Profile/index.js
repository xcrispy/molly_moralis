import { Button, Heading, InputGroup } from "@chakra-ui/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../../styles/Home.module.css";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { Card, TextInput, TextArea, FileInput } from "grommet";
import { Box } from "@chakra-ui/react";
import { DropButton } from "grommet";
import PostForm from "../PostForm";
import { useState } from "react";
import { ethers } from "ethers";
import { useMoralisFile, useMoralis } from "react-moralis";
import { Input } from "degen";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function Profile() {
  const [fileUrl, setFileUrl] = useState(null);
  var file;
  async function onChange(e) {
    file = e.target.files[0];
    setshowFile(false);
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  const {
    authenticate,
    isAuthenticated,
    logout,
    user,
    isWeb3Enabled,
    enableWeb3,
  } = useMoralis();

  const ShowFile = () => {
    console.log(fileUrl);

    return (
      <img
        alt=""
        className="rounded mt-4"
        style={{ height: "320px", width: "350px" }}
        src={fileUrl}
      />
    );
  };
  const setMode = () => setshowFile(true);
  const [showFile, setshowFile] = useState(false);
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Heading>Profile</Heading>
        {showFile ? <ShowFile /> : null}
        <br />
        {isAuthenticated ? (
          <>
            <Box>
              <DropButton
                label="Change Pic"
                dropAlign={{ right: "left" | "right", top: "bottom" }}
                dropContent={
                  <>
                    <input
                      required
                      type="file"
                      name="NFT"
                      className="my-2"
                      onChange={onChange}
                    />
                    <Button p="2" mt="2" onClick={setMode}>
                      {" "}
                      Save
                    </Button>
                  </>
                }
              />
            </Box>
          </>
        ) : null}
        <br />
        {isAuthenticated ? user.get("ethAddress") : null}
      </main>

      <Footer />
    </>
  );
}
