import Card from '@/app/ui/dashboard/card/card'
import styles from '@/app/ui/dashboard/dashboard.module.css'
import Chart from '@/app/ui/dashboard/chart/chart'
import Rightbar from '@/app/ui/dashboard/rightbar/rightbar'
import Transactions from '../ui/dashboard/transactions/transactions'



export default function DashboardPage() {

    

   
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    <Card />
                    <Card />
                    <Card />
                </div>
                <Transactions />
                <Chart />
            </div>
            <div className={styles.side}>
                <Rightbar />
            </div>
            
        </div>
    )
}