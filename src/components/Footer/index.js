import styles from '../../styles/Home.module.css'
import Image from 'next/image'


export default function Footer() {
    return(
        <footer className={styles.footer}>
        <a
          href="https://cypher.so"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Cypher Labs 2022
          <span className={styles.logo}>
            {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
            <h1 ></h1>
          </span>
        </a>
      </footer>
    )
}