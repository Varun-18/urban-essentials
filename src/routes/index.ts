import { Request, Response, Router } from 'express';
import { userRouter } from './user';
import { productRouter } from './products';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Urban Essentials - Server Status</title>
        <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            text-align: center;
            padding: 50px;
        }
        h1 {
            color: #4CAF50;
        }
        p {
            font-size: 18px;
        }
        .status {
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }
    </style>
    </head>
    <body>

        <h1>Welcome to Urban Essentials!</h1>
        <p class="status">The server is up and running successfully!</p>
        <p>Current time: <strong>${new Date().toLocaleString()}</strong></p>
        <p>Feel free to explore our API or visit our website for more
            information.</p>

    </body>
</html>`);
});

router.use('/user', userRouter);
router.use('/products', productRouter);

export default router;
