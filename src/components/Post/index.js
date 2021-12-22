import {Card, Video, Button, CardFooter} from "grommet"
import { Favorite, Play, Chat } from 'grommet-icons';

import { Center, Text, VStack, HStack, Flex, Spacer} from "@chakra-ui/react"

export default function Post () {
  return(
    <>
    <Card height="small" width="large" background="dark-1">
                    <Center>
                        <Text pt="4">Stream Highlight</Text>
                    </Center>

                    <Video controls="over" fit="cover">
                    <source key="video" src="/public/twitchclip1.mp4" type="video/mp4" />
                    </Video>
                    <CardFooter pad={{horizontal: "small"}} background="light-2">
                    <Flex>
                    <VStack>
                        <Spacer/>
                        <HStack>
                            
                                <HStack>
                                    
                                    <Play size="medium" color="black"/>
                                    <Text>1023324</Text>
                                </HStack>
                            
                            <Button>
                                <HStack>
                                    <Favorite size="medium" color="red"/>
                                    <h2>99</h2>
                                </HStack>
                            </Button>
                        
                            <Button>
                                <HStack>
                                    <Chat size="medium" color="blue"/>
                                    <Text>125</Text>
                                </HStack>
                            </Button>

                        </HStack>
                        <Spacer/>
                    </VStack>
                    </Flex>
                    {/* <Button icon={<Icons.ShareOption color="plain" />} hoverIndicator /> */}
                    </CardFooter>
                </Card>
  
  </>
  )
}