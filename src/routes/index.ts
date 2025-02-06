import { Request, Response, Router } from 'express';
import { userRouter } from './user';
import { productRouter } from './products';
import { sendEmail} from 'utils';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).render("home");
});

router.get("/mail/test/:id",async(req:Request,res:Response)=>{
    try {
        const to = req.params.id

        const result = sendEmail({
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
