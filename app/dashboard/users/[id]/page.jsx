import styles from '@/app/ui/dashboard/users/signUser/signUser.module.css';
import Image from 'next/image';
export default function SignUserPage() {
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src="/noavatar.png" alt='' fill />
                </div>
                John Doe
            </div>
            <div className={styles.formContainer}>
                <form className={styles.form}>
                    <label>Username</label>
                    <input type='text' placeholder='John Doe' name='username' />
                    <label>Email</label>
                    <input type='email' placeholder='John Doe@gmail.com' name='email' />
                    <label>Password</label>
                    <input type='password' name='password' />
                    <label>Phone</label>
                    <input type='text' placeholder='+1234567' name='phone' />
                    <label>Address</label>
                    <textarea type='text' placeholder='New York' name='address' />
                    <label>Is Admin?</label>
                    <select name='isAdmin' id='isAdmin'>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    <label>Is Active?</label>
                    <select name='isActive' id='isActive'>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    <button>Update</button>
                </form>
            </div>
        </div>
    )
}