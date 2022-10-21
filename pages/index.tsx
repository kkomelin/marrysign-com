import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import c from 'clsx'

const Home: NextPage = () => {
  const title = "MarrySign";
  const description = "We empower any couple to register marriage online";
  return (
    <div className={c(styles.container, 'bg-[#fcf6fa]')}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>
          <a href="https://marrysign.com" className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{title}</a>
        </h1>

        <p className={c(styles.description, 'text-gray-600')}>{description}</p>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
};

export default Home;
