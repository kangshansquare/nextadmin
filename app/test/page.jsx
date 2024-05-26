export default async function TestPage() {
    
    const handleForm = async (data) => {
        "use server"
        console.log(data)
        const username = data.get("username")
        console.log(username)
    }
    

    return (
        <form action={handleForm}>
            <input type="text" name="username" />
            <button>Send</button>
        </form>
    )
}