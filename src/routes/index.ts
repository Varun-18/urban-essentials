import { Request, Response, Router } from 'express';
import { userRouter } from './user';
import { productRouter } from './products';
import { transporter } from 'utils';

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

router.get("/mail/test/:id",async(req:Request,res:Response)=>{
    try {
        
        const to = req.params.id
        console.log("🚀 ~ router.get ~ to:", to)
        const result = transporter.sendMail({
            to,
            subject: "Node mailer Test",
            html: `
            <h1>Test email from nodemailer to user ${to}</h1>
            `
        });
        
        console.log("Email sent")
        res.status(200).json(result)
    } catch (error) {
        console.log("🚀 ~ router.get ~ error:", error)
        res.status(400).json(error)
    }
})

router.use('/user', userRouter);
router.use('/products', productRouter);

export default router;
