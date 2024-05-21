import styles from '@/app/ui/dashboard/products/signalProduct/signalProduct.module.css';
import Image from 'next/image';
import { LabelList } from 'recharts';
export default function SignalProductPage() {
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src="/noavatar.png" alt='' fill />
                </div>
                Phone
            </div>
            <div className={styles.formContainer}>
                <form className={styles.form}>
                    <label>Title</label>
                    <input type='text'  name='title' />
                    <label>Price</label>
                    <input type='number' placeholder='$999' name='price' />
                    <label>Stock</label>
                    <input type='number' name='stock' placeholder='23' />
                    <label>Color</label>
                    <input type='text' placeholder='red' name='color' />
                    <label>Size</label>
                    <input type='number' placeholder='10' name='size' />
                    <label>Cat</label>
                    <select name='cat' id='cat'>
                        <option value="kitchen">Kitchen</option>
                        <option value="computers">Computers</option>
                        <option value="phone">Phone</option>
                    </select>
                    <label>Description</label>
                    <textarea type="text" placeholder='description' id='desc' rows="16" cols="30" />
                    <button>Update</button>
                </form>
            </div>
        </div>
    )
}