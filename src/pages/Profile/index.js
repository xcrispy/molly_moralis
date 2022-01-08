import { Button, Heading, InputGroup } from "@chakra-ui/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../../styles/Home.module.css";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { Card, TextInput, TextArea, FileInput } from "grommet";
import { Box } from "@chakra-ui/react";
import { DropButton } from "grommet";
import PostForm from "../PostForm";
import { useState } from "react";
import ReactPlayer from "react-player";
import { ethers } from "ethers";
import { useMoralisFile, useMoralis } from "react-moralis";
import { Input } from "degen";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function Profile() {
  const [size, setSize] = useState(0);
  var lol = 1124908;
  const [fileUrl, setFileUrl] = useState(null);
  const [value, setValue] = React.useState(0);
  var file;
  async function onChange(e) {
    file = e.target.files[0];
    setshowFile(false);
    try {
      const added = await client.add(file, {
        progress: (prog) => {
          setSize(prog);
          console.log(`received: ${prog}`);
        },
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
    if (fileUrl !== null) {
      console.log(fileUrl);
      if (size <= lol) {
        return (
          <img
            alt=""
            className="rounded mt-4"
            style={{ height: "320px", width: "350px" }}
            src={fileUrl}
          />
        );
      } else {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ReactPlayer playing={true} url={fileUrl} />
          </div>
        );
      }
    }
  };
  const setMode = () => {
    console.log(size);
    if (fileUrl !== null) {
      setshowFile(true);
    }
  };
  const [showFile, setshowFile] = useState(false);

  return (
    <>
      <Header />
      <br />
      <Heading className={styles.head}>Profile</Heading>
      <main className={styles.main}>
        {showFile && isAuthenticated ? <ShowFile /> : null}
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
        {isAuthenticated ? (
          <>
            {user.get("ethAddress")}
            <br />
            <br />
            <div className="">
              <div>
                <Paper square>
                  <Tabs
                    value={value}
                    textColor="primary"
                    indicatorColor="primary"
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  >
                    <Tab label="Videos Minted" />
                    <Tab label="Videos Owned" />
                    <Tab label="Videos Sold" />
                    <Tab label="All Videos" />
                  </Tabs>
                  <br />
                  {value === 0 ? (
                    <>
                      <div>probably videos i have minted</div>
                    </>
                  ) : null}
                  {value === 1 ? (
                    <>
                      <div>probably videos i own</div>
                    </>
                  ) : null}
                  {value === 2 ? (
                    <>
                      <div>probably videos i have sold</div>
                    </>
                  ) : null}
                  {value === 3 ? (
                    <>
                      <div>probably everthing i do here</div>
                    </>
                  ) : null}
                </Paper>
              </div>
            </div>
          </>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
