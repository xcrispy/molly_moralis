import { Card, Video, Button, CardFooter } from "grommet";
//import { Favorite, Play, Chat, Like } from "grommet-icons";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import ReactPlayer from "react-player";
import { Center, Text, VStack, HStack, Flex, Spacer } from "@chakra-ui/react";
//import { Value } from "grommet-controls";

// Extra test

import { nftaddress, nftmarketaddress } from "../../pages/config";
import NFT from "../../../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

// Extra test

export default function Post() {
  // test code

  const [nfts, setNfts] = useState([]);
  // showModal const
  const [showModal, setShowModal] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [Items, setItems] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);

  // modal openning

  async function loadNFTs() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          itemId: i.itemId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }

  async function buyNft(nft) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.itemId,
      {
        value: price,
      }
    );
    setItems(nft.itemId);
    setTxHash(transaction.hash);
    await transaction.wait();
    loadNFTs();
  }
  // Test
  // States and variables
  const [like, setLike] = useState(5);
  const Like = () => {
    console.log("you liked a video");
  };

  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;

  return (
    <>
      <Card height="450px" width="700px" background="dark-1"></Card>
      <Center>
        <Text pt="4">Stream Highlight</Text>
      </Center>

      {/*Test code*/}

      <div className=" m-3 flex justify-center">
        <div className="px-4 max-h-80 " style={{ maxWidth: "1400" }}>
          <div className="">
            <div className="max-h-80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
              {nfts.map((nft, i) => (
                <div
                  key={i}
                  className="hover:-translate-y-4 transform transition max-h-full border shadow rounded-xl overflow-hidden"
                >
                  {console.log(nft)}
                  <ReactPlayer
                    url={nft.image}
                    controls
                    style={{
                      cursor: "pointer",
                      height: "320px",
                      width: "350px",
                    }}
                  />
                  <div className="p-4 max-h-80">
                    <p
                      style={{ height: "40px" }}
                      className="text-2xl font-semibold"
                    >
                      {nft.name}
                    </p>
                    <div style={{ height: "40x", overflow: "hidden" }}>
                      <p className="text-gray-400  font-serif">
                        {nft.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row p-4 bg-black">
                    <p className="text-2xl  font-serif font-bold text-white">
                      Price - {nft.price}&nbsp;{" "}
                    </p>
                    <img
                      height="15px"
                      width="15px"
                      src="https://www.cryptologos.cc/logos/ethereum-eth-logo.svg?v=014"
                    />
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-12 rounded"
                    onClick={() => {
                      buyNft(nft);
                    }}
                  >
                    Buy
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*Test code*/}
      {/*} <Video controls="over" fit="cover">
          <source
            // key="video"
            width="700px"
            height="400px"
            src="https://www.youtube.com/watch?v=bSMBiKcHPys"
            // type="video/mp4"
            //../../../public/twitchclip1.mp4
          />
  </Video> */}
      {/* <ReactPlayer
          width="700px"
          height="430px"
          controls
          url="https://www.youtube.com/watch?v=F2EfTe7YOT4"
        /> */}

      <CardFooter pad={{ horizontal: "small" }} background="light-2">
        <Flex>
          <VStack>
            <Spacer />
            <HStack>
              <HStack style={{ marginLeft: ".7rem" }}>
                {/* <Play size="medium" color="black" /> */}
                <Text>1023324</Text>
                <br />
              </HStack>
              <br />

              <Button style={{ marginLeft: "2rem" }} onClick={Like}>
                <HStack>
                  {/* <Favorite size="medium" color="red" /> */}
                  <h2>{like}</h2>
                </HStack>
              </Button>

              <Button style={{ marginLeft: "2rem" }}>
                <HStack>
                  {/* <Chat size="medium" color="blue" /> */}
                  <Text>125</Text>
                </HStack>
              </Button>
            </HStack>
            <Spacer />
          </VStack>
        </Flex>
        {/* <Button icon={<Icons.ShareOption color="plain" />} hoverIndicator /> */}
      </CardFooter>
    </>
  );
}
