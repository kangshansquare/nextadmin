import styles from '@/app/ui/dashboard/products/addProducts/addProducts.module.css';

export default function AddProductsPage() {
    return (
        <div className={styles.container}>
            <form action='' className={styles.form}>
                <input type='text' placeholder='title' name='title' required />
                <select name='cat' id='cat'>
                    <option value="general">Choice a Category</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="phone">Phone</option>
                    <option value="computer">Computer</option>
                </select>
                <input type='number' placeholder='price' name='price'/>
                <input type='number' placeholder='stock' name='stock'/>
                <input type='text' placeholder='color' name='color'/>
                <input type='text' placeholder='size' name='size'/>
                <textarea name='desc' id='desc' cols="30" rows="16" placeholder='Description'></textarea>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}