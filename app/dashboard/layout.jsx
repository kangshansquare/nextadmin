import Sidebar from '@/app/ui/dashboard/sidebar/sidebar';
import Navbar from '@/app/ui/dashboard/navbar/navbar';
import styles from '@/app/ui/dashboard/dashboard.module.css';
import Footer from '@/app/ui/dashboard/footer/footer';

export default function DashboardLayout({children}) {
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <Sidebar />
            </div>
            <div className={styles.content}>
                <Navbar />
                {children}
                <Footer />
            </div>
        </div>
    )
}