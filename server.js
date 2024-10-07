import express from 'express';
import {spawnSync} from 'node:child_process';
import {readdir, readFile} from 'node:fs/promises';

const app = express();
const port = 8001;

async function readBlogPosts() {
    const postsDir = await readdir('./frontEnd/posts', 'utf8');

    return await Promise.all(postsDir.map(async post => {
        const data = JSON.parse(
            spawnSync('grep', ['{\ntitle\nlast update\n}', `./frontEnd/posts/${post}`], {encoding: 'utf8'})
            .stdout.replaceAll('\n', ''));
        data.body = await readFile(`./frontEnd/posts/${post}`, 'utf8');
        return data;
    }))
}

app.use(express.static('frontEnd'))

app.get('/get-blog-posts', async (request, res) => {
    console.log(request.url);
    res.writeHead(200, {
        'access-control-allow-origin': '*'
    })
    res.write(JSON.stringify(await readBlogPosts()))
    res.end();
});

app.get('*', async (request, res) => {
    console.log(request.url);
    res.write(await readFile('./frontEnd/index.html', 'utf8'));
    res.end();
})

app.listen(port, () => console.log(`server is listening on port ${port}`));
