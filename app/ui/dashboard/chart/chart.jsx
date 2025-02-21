"use client"
import styles from './chart.module.css';
import { 
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
 } from 'recharts'

const data = [
    {
        name: "Sun",
        visit: 4000,
        click: 2400,
    },
    {
        name: "Mon",
        visit: 3000,
        click: 1398,
    },
    {
        name: "Tue",
        visit: 3000,
        click: 1398,
    },
    {
        name: "Wed",
        visit: 2000,
        click: 3800,
    },
    {
        name: "Thu",
        visit: 1890,
        click: 4800,
    },
    {
        name: "Fri",
        visit: 2390,
        click: 2800,
    },
    {
        name: "Sat",
        visit: 3490,
        click: 4400,
    },
]


export default function ChartPage() {

    


    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Weekly Recap</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left:20,
                    bottom:5,
                  }}
                >
                    
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{background:"#151c2c", border:"none"}} />
                    <Legend />
                    <Line type="monotone" dataKey="visit"  stroke='#8884dd8'/>
                    <Line type="monotone" dataKey="click"  stroke='#82ca9d'/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}