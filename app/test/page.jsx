export default async function Test() {
    const data = await getVersion();
    console.log(data)
    return (
        <h1>Test</h1>
    )
}

export const getVersion = async () => {
    const res = await fetch("http://192.168.56.101:8848/nacos/v1/console/server/state")
    const data = await res.json();
    return data
}