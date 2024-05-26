## Next.js Learning
Fork from "https://github.com/safak/nextadmin.git"

```bash
$ mkdir nextadmin
$ cd nextadmin
$ git clone https://github.com/kangshansquare/nextadmin.git .
$ npm install
```

安装icon：
```bash
$ npm install react-icons@4.11.0
```

安装chart插件：
```bash
$ npm install recharts@2.9.0
```

## 目录结构
```
app/
    dashboard/                      # /dashboard
        page.jsx
    login/                          # /login
        page.js
    ui/                             # css文件
        dashboard/
            dashboard.module.css
        login/
            login.module.css
    lib/                            # 请求后端数据的模块、数据库
        utils.js                    # 数据库链接
        data.js                     # 请求数据
        models.js                   # 创建数据库
    .env                            # 项目中用到的变量，如数据库链接/用户名/密码，可以在.gitignore中填入此文件，避免敏感数据上传到git 
    .gitignore                      
```


## Fetch Data

- MongoDB：https://mongoosejs.com/docs/index.html
```
$ npm install mongoose
```

启动mongodb：
```
$ docker run --name mongodb -p 27017:27017 -d  -e MONGODB_INITDB_ROOT_USERNAME=admin -e MONGODB_INITDB_ROOT_PASSWORD=123456 mongo:4.4

# 宿主机安装mongosh，连接mongodb：
$ mongosh mongodb://localhost:27017


> show dbs                                      # 显示所有数据库
> use dashboard                                 # 切换dashboard数据库，没有则创建数据库
> show collections                              # 显示dashboard数据下所有集合（相当于mysql中数据库中的表）
> db.createCollection('CollectionName')         # 创建集合
> db.collectionName.drop()                      # 删除集合
> db.dropDatabase()                             # 删除数据库（需要先使用use切换到数据库）
```

在Next.js中使用mongoose：

1.项目根目录下创建`.env`文件:
```
# mongodb://host:port/databaseName
MONGO = mongodb://localhost:27017/dashboard   
```
在.gitignore文件中，加上`.env`文件

2.项目根目录下创建lib目录，创建mongodb连接：
```javascript
// app/lib/utils.js
import mongoose from "mongoose";

export const connectToDB = async () => {
    const connection = {}

    try {
        if(connection.isConnected) return;
        const db = await mongoose.connect(process.env.MONGO);
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

```

3.定义数据库：
```javascript
// app/lib/models.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            min: 3,
            max: 20,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        img: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        address: {
            type: String,
        }
    }, {timestamps: true}
)

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            min: 3,
            max: 20,
        },
        desc: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        stock: {
            type: Number,
            required: true,
            min: 0
        },
        img: {
            type: String,
        },
        size: {
            type: String,
        },
        color: {
            type: String,
        }
    }, {timestamps: true}
)

export const User = mongoose.models.User || mongoose.model("User", userSchema)
export const Product = mongoose.models.Product || mongoose.model("Product", productSchema)
```
4.查询数据：
```javascript
// app/lib/data.js

import { User } from './models';
import { connectToDB } from './utils';
export const fetchUsers = async () => {
    try {
        connectToDB();
        const users = await User.find();
        return users;
    } catch (err) {
        console.log(err)
        throw new Error("Failed to fetch users!");
    }
};
```
5.在页面中获取数据：
```javascript
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
```
问题1：Next.js在Mongodb中，自动创建名为users、products的集合，为什么？ 应该是User和Product

问题2：`const db = await mongoose.connect(process.env.MONGO);`   process是啥？

报错：user.img中包含第三方链接
```
Unhandled Runtime Error
Error: Invalid src prop (https://tse1-mm.cn.bing.net/th/id/OIP-C.yXBxFak6hUV9mKiGrTq-swHaLH?w=135&h=184&c=7&r=0&o=5&pid=1.7) on `next/image`, hostname "tse1-mm.cn.bing.net" is not configured under images in your `next.config.js`
See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host
```
解决方法：配置`next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "tse1-mm.cn.bing.net"       #
            },
            {
                protocol: "https",
                hostname: "tse3-mm.cn.bing.net"       # 
            }
        ]
    }
}

module.exports = nextConfig

```




## 搜索框
1.在url上，显示用户输入信息，比如，http://example.com/dashboard？q=xxx


随着用户输入执行搜索的搜索框，需要等待用户完成输入（或一定时间内用户没有再输入）再进行搜索，避免频繁发送请求，给服务器带来压力。使用`use-debounce`库

```
$ npm install use-debounce@9.0.4
```


## Server Actions
```javascript
# app/test/page.jsx
export default async function TestPage() {
    
    const handleForm = async (data) => {
        "use server"
        console.log(data)
    }
    

    return (
        <form action={handleForm}>
            <input type="text" name="username" />
            <button>Send</button>
        </form>
    )
}

// 输出
FormData {
  [Symbol(state)]: [
    {
      name: '$ACTION_ID_f22954f4aec9e1904b58cb1665c29d747695e0e3',
      value: ''
    },
    { name: 'username', value: 'test' }
  ]
}

// 用户input输入的值
const username = data.get("username")
```

## 加密
对用户密码进行哈希保存。安装`bcrypt`:
```shell
$ npm install bcrypt@5.1.1
```


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


