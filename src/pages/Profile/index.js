import {Heading} from "@chakra-ui/react"
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import styles from '../../styles/Home.module.css'
import PostForm from "../PostForm"
import {useState} from 'react'
import { ethers } from "ethers";
import { useMoralisFile, useMoralis } from "react-moralis";


export default function Profile() {
   
    const { authenticate, isAuthenticated, logout, user, isWeb3Enabled, enableWeb3 } = useMoralis();

    return(
        <>
        <Header/>
            <main className={styles.main}>
                       {user.get("ethAddress")}
                <Heading>Profile</Heading>
                
            </main>
            
        <Footer />
        </>
    )
}