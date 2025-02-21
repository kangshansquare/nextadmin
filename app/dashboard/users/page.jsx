import styles from '@/app/ui/dashboard/users/users.module.css';
import Search from '@/app/ui/dashboard/search/search';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from '@/app/ui/dashboard/pagination/pagination';

import { fetchUsers } from '@/app/lib/data';

export default async function UsersPage({placeholder}) {
    const users = await fetchUsers();
    console.log('用户列表..............')
    
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a user..." />
                <Link href="/dashboard/users/add">
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Created At</td>
                        <td>Role</td>
                        <td>Status</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <div className={styles.user}>
                                    <Image 
                                        src={user.img || "/noavatar.png"} 
                                        alt=""
                                        width={40}
                                        height={40}
                                        className={styles.userImage}
                                    />
                                    {user.username}
                                </div>
                            </td>
                            <td>{user.email}</td>
                            <td>13.01.2022</td>
                            <td>{user.isAdmin ? "Admin" : "Client"}</td>
                            <td>{user.isActive ? "active" : "pass"}</td>
                            <td>
                                <div className={styles.buttons}>
                                    <Link href={`/dashboard/users/${user.id}`}>
                                        <button className={`${styles.button} ${styles.view}`}>View</button>
                                    </Link>
                                    <Link href="">
                                        <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            <Pagination />
        </div>
    )
}