import style from './footer.module.css';

export default function Footer() {
    return (
        <div className={style.container}>
            <div className={style.logo}>Lama Dev</div>
            <div className={style.text}>&copy; All rights reserved.</div>
        </div>
    )
}