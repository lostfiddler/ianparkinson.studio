export default async function getBlogPosts() {
    const response = await fetch('/get-blog-posts')
    try {
        return response.json();
    } catch (err) {
        console.log(err)
    }
}
