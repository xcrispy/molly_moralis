import Post from "../Post"
import {VStack, Spacer} from "@chakra-ui/react"


export default function Feed() {
    return(
        <div>
            <VStack>
                <Post/>
                <Spacer/>
                
            </VStack>
            
            
            
        </div>
    )
}
