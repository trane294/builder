import { Prisma, PrismaClient } from '@prisma/client';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const allowedOrigins = [
    'http://localhost:5173',
];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

const prisma = new PrismaClient();
const app: Express = express();

app.use(cors(options));
app.use(express.json());

app.get('/api', async (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.post('/api/user/register', async (req: Request, res: Response) => {
    try {
        const { firstName, email, password, passwordConfirm } = req.body;

        if (!firstName || !email || !password || !passwordConfirm) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }

        if (password !== passwordConfirm) {
            res.status(400).json({ message: 'Passwords do not match.' });
            return;
        }

        res.status(201).json({ message: 'User registration successful' });
        return;
    } catch (error: any) {
        res.status(500).json({ message: error.message });
        return;
    }
});

app.post('/api/user/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required.' });
            return;
        }

        const userToken = 'fake-jwt-token-123';
        res.status(200).json({
            userToken,
            message: 'Login successful',
            firstName: 'FakeUserFirstName'
        });
        return;
    } catch (error: any) {
        res.status(500).json({ message: error.message });
        return;
    }
});

app.get('/api/user/profile', async (req: Request, res: Response) => {
    res.status(200).json({
        firstName: 'FakeUserFirstName'
    });
    return;
});

// app.post(`/signup`, async (req, res) => {
//     const { name, email, posts } = req.body

//     const postData = posts?.map((post: Prisma.PostCreateInput) => {
//         return { title: post?.title, content: post?.content }
//     })

//     const result = await prisma.user.create({
//         data: {
//             name,
//             email,
//             posts: {
//                 create: postData,
//             },
//         },
//     })
//     res.json(result)
// })

// app.post(`/post`, async (req, res) => {
//     const { title, content, authorEmail } = req.body
//     const result = await prisma.post.create({
//         data: {
//             title,
//             content,
//             author: { connect: { email: authorEmail } },
//         },
//     })
//     res.json(result)
// })

// app.put('/post/:id/views', async (req, res) => {
//     const { id } = req.params

//     try {
//         const post = await prisma.post.update({
//             where: { id: Number(id) },
//             data: {
//                 viewCount: {
//                     increment: 1,
//                 },
//             },
//         })

//         res.json(post)
//     } catch (error) {
//         res.json({ error: `Post with ID ${id} does not exist in the database` })
//     }
// })

// app.put('/publish/:id', async (req, res) => {
//     const { id } = req.params

//     try {
//         const postData = await prisma.post.findUnique({
//             where: { id: Number(id) },
//             select: {
//                 published: true,
//             },
//         })

//         const updatedPost = await prisma.post.update({
//             where: { id: Number(id) || undefined },
//             data: { published: !postData?.published },
//         })
//         res.json(updatedPost)
//     } catch (error) {
//         res.json({ error: `Post with ID ${id} does not exist in the database` })
//     }
// })

// app.delete(`/post/:id`, async (req, res) => {
//     const { id } = req.params
//     const post = await prisma.post.delete({
//         where: {
//             id: Number(id),
//         },
//     })
//     res.json(post)
// })

// app.get('/users', async (req, res) => {
//     const users = await prisma.user.findMany()
//     res.json(users)
// })

// app.get('/user/:id/drafts', async (req, res) => {
//     const { id } = req.params

//     const drafts = await prisma.user
//         .findUnique({
//             where: {
//                 id: Number(id),
//             },
//         })
//         .posts({
//             where: { published: false },
//         })

//     res.json(drafts)
// })

// app.get(`/post/:id`, async (req, res) => {
//     const { id }: { id?: string } = req.params

//     const post = await prisma.post.findUnique({
//         where: { id: Number(id) },
//     })
//     res.json(post)
// })

// app.get('/feed', async (req, res) => {
//     const { searchString, skip, take, orderBy } = req.query

//     const or: Prisma.PostWhereInput = searchString
//         ? {
//             OR: [
//                 { title: { contains: searchString as string } },
//                 { content: { contains: searchString as string } },
//             ],
//         }
//         : {}

//     const posts = await prisma.post.findMany({
//         where: {
//             published: true,
//             ...or,
//         },
//         include: { author: true },
//         take: Number(take) || undefined,
//         skip: Number(skip) || undefined,
//         orderBy: {
//             updatedAt: orderBy as Prisma.SortOrder,
//         },
//     })

//     res.json(posts)
// })

const server = app.listen(3000, () =>
    console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: https://github.com/prisma/prisma-examples/blob/latest/orm/express/README.md#using-the-rest-api`),
)
