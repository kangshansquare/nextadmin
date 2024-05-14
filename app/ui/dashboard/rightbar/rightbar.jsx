import { MdPlayCircleFilled, MdReadMore } from 'react-icons/md'
import styles from './rightbar.module.css'
import Image from 'next/image'

export default function RightBarPage() {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <Image src="/astronaut.png" alt="" fill className={styles.bg} />
                </div>
                <div className={styles.texts}>
                    <span className={styles.notifacation}>Available Noe</span>
                    <h3 className={styles.titel}>
                        How to use the new version of the admin dashboard?
                    </h3>
                    <span className={styles.subtitle}>Take 5 minutes to learn</span>
                    <p className={styles.desc}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Reprehenderit eius libero perspiciatis recusandae possimus.
                    </p>
                    <button className={styles.button}>
                        <MdPlayCircleFilled />
                        Watch
                    </button>
                </div>
            </div>

            <div className={styles.item}>
                <div className={styles.texts}>
                    <span className={styles.notifacation}>Available Noe</span>
                    <h3 className={styles.titel}>
                        How to use the new version of the admin dashboard?
                    </h3>
                    <span className={styles.subtitle}>Take 5 minutes to learn</span>
                    <p className={styles.desc}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Reprehenderit eius libero perspiciatis recusandae possimus.
                    </p>
                    <button className={styles.button}>
                        <MdReadMore />
                        Learn
                    </button>
                </div>
            </div>
        </div>


    )
}