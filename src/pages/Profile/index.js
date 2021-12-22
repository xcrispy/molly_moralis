import {Heading} from "@chakra-ui/react"
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import styles from '../../styles/Home.module.css'

export default function Profile() {
    return(
        <>
        <Header/>
            <main className={styles.main}>
                <Heading>Profile</Heading>
            </main>
            
        <Footer />
        </>
    )
}