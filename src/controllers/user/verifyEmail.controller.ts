import jwt, { Secret } from "jsonwebtoken"
import { Response } from "express";

import { STATUS_CODES } from "constant";
import { verifyUser } from "./helpers";
import { AuthRequest } from "declaration";

export const verifyEmail = async(req:AuthRequest,res:Response) => {
    try {
        const user = req.user
        const verificationToken = req.params.token

        if(!verificationToken){
            res.status(STATUS_CODES.UNAUTHORIZED).json({message :"Unauthorized access"})
            return ;
        }

        const isVerfied = jwt.verify(verificationToken,process.env.JWT_SECRET as Secret)
        
        if(!isVerfied){
            res.status(STATUS_CODES.UNAUTHORIZED).json({message:"Unauthorized access"})
            return 
        }

        const updatedUser = await verifyUser(user.email)

        res.status(STATUS_CODES.OK).json({message : "user verified",...updatedUser})
    } catch (error) {
        console.log("🚀 ~ verifyEmail ~ error:", error)
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(error)
    }
}