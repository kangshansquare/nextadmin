"use client"
import { MdSearch } from 'react-icons/md';
import styles from './search.module.css';
import { useSearchParams,useRouter,usePathname } from 'next/navigation';

export default function Search({placeholder}) {
    const searchParams = useSearchParams();
    const {replace} = useRouter();
    const pathname = usePathname();

    const params = new URLSearchParams(searchParams);

    params.set("test", "value");
    replace(`${pathname}?${params}`)

    console.log(searchParams)
    console.log(pathname)

    return (
        <div className={styles.container}>
            <MdSearch />
            <input type='text' placeholder={placeholder} className={styles.input} />
        </div>
    )
}