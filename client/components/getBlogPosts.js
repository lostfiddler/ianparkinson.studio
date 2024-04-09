export default async function getBlogPosts() {
    const response = await fetch('http://192.168.1.231:8001/get-blog-posts')
    try {
        return response.json();
    } catch (err) {
        console.log(err)
    }
}
