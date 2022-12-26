import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>LO Birthdays</title>
      </Head>
      <main className={styles.main}>
        <h1 className={inter.className}>Welcome to LO Birthdays app!</h1>
      </main>
    </>
  )
}
