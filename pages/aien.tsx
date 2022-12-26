import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Aien.module.css";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { Howl } from "howler";

const inter = Inter({ subsets: ["latin"] });
const HBD_SONG_PATH = "/hbd-song.mp3";

export default function Home() {
  const [progress, setProgress] = useState("0");

  useEffect(() => {
    require("preload-js");

    // @ts-ignore
    var createjs = window.createjs;
    const queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);

    queue.loadFile(HBD_SONG_PATH);

    queue.on("complete", () => {
      hidePreloaderAnimation();
    });

    queue.on("progress", (event: any) => {
      let progress = Math.floor(event.progress * 100).toString();
      setProgress(progress);
    });
  }, []);

  const hidePreloaderAnimation = () => {
    const tl = gsap
      .timeline({
        onComplete: () => {
          tl.kill();
        },
      })
      .to("#preload-screen span", {
        opacity: 0,
        pointerEvents: "none",
        display: "none",
      })
      .to("#preload-screen .acceptance", {
        display: "flex",
        opacity: 1,
        pointerEvents: "all",
      });
  };

  const startTheSound = () => {
    gsap
      .timeline()
      .to("#preload-screen .acceptance", {
        opacity: 0,
        pointerEvents: "none",
        display: "none",
      })
      .set("#preload-screen", {
        display: "none",
      })
      .to("#wrapper", {
        opacity: 1,
        pointerEvents: "all",
      });

    const player = new Howl({
      src: HBD_SONG_PATH,
      volume: 1,
      loop: true,
      pool: 1,
      autoplay: false,
      html5: true,
      onload: () => {
        player.play();
      },
    });
  };

  return (
    <>
      <Head>
        <title>Happy Birthday Aien! | LO Birthdays</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.preloader} id="preload-screen">
          <span className={inter.className} style={{ opacity: 0.7 }}>
            {progress}%
          </span>
          <div className="acceptance">
            <p className={inter.className}>
              We're streaming sounds on this page for better experience.
            </p>
            <button className={inter.className} onClick={startTheSound}>
              Accept
            </button>
          </div>
        </div>
        <div className={styles.wrapper} id="wrapper">
          <div className={styles.person}>
            <Image
              src="/aien.jpg"
              alt="Aien"
              width={200}
              height={200}
              priority
            />
            <h1 className={inter.className}>Happy Birthday Aien!</h1>
            <p className={inter.className}>The team's wishes and messages</p>
          </div>
          <div className={styles.wishes}>
            <div className={styles.wish}>
              <p className={inter.className}>happy birthday boss =)))))))</p>
              <span className={inter.className}>Helia</span>
            </div>
            <div className={styles.wish}>
              <p className={inter.className}>
                Aien Wishing you many more years of good health and prosperity
              </p>
              <span className={inter.className}>Mahsa</span>
            </div>
            <div className={styles.wish}>
              <p className={inter.className}>
                Happy Birthday Aien , I wish you best of luck
              </p>
              <span className={inter.className}>Matin</span>
            </div>
            <div className={styles.wish}>
              <p className={inter.className}>
                Thanks for being someone I can always turn to. Happy birthday to
                my kind-hearted friend!
              </p>
              <span className={inter.className}>Mjavad</span>
            </div>
            <div className={styles.wish}>
              <p className={inter.className}>
                Hallo Aien, <br />
                zu deinem Geburtstag wünsche ich dir nicht nur Gesundheit, Liebe
                und Glück. Ich wünsche dir von Herzen, dass alle deine Wünsche
                in Erfüllung gehen und du deine persönlichen Ziele erreichst.
                Mreza
              </p>
              <span className={inter.className}>Mohammad Reza</span>
            </div>
            <div className={styles.wish}>
              <p className={inter.className}>
              Happy birthday to the person who is always willing to test a new code with us and also willing to change it when it doesn't work out. I'm so happy that the universe brought you in our life also I hope your birthday is as amazing and special as you are. 
              </p>
              <span className={inter.className}>Farzaneh</span>
            </div>
            <div className={styles.wish}>
              <p className={inter.className}>
              01101000 01100001 01110000 01110000 01111001 00100000 01100010 01101001 01110010 01110100 01101000 01100001 01100100 01111001 (Happy Birthday in binary)
              </p>
              <span className={inter.className}>Yousef</span>
            </div>
            <div className={styles.wish}>
              <p className={inter.className}>
              Happy Birthday to you, Aien. I hope you will be blessed with many good things and great successes in the upcoming year. <br />
              Also, I hope this year "Bas Koni" =))
              </p>
              <span className={inter.className}>Hossein</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
