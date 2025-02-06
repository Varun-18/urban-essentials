import jwt, { JwtPayload, Secret } from "jsonwebtoken"
import { Request, Response } from "express";

import { STATUS_CODES } from "constant";
import { verifyUser } from "./helpers";

export const verifyEmail = async(req:Request,res:Response) => {
    try {
        const verificationToken = req.params.token

        if(!verificationToken){
            res.status(STATUS_CODES.UNAUTHORIZED).json({message :"Unauthorized access"})
            return ;
        }

        const isVerfied = jwt.verify(verificationToken,process.env.JWT_SECRET as Secret) as JwtPayload
        
        if(!isVerfied || !isVerfied.email){
            res.status(STATUS_CODES.UNAUTHORIZED).json({message:"Unauthorized access"})
            return 
        }

        const updatedUser = await verifyUser(isVerfied.email)

        res.status(STATUS_CODES.OK).json({message : "user verified",...updatedUser})
    } catch (error) {
        console.log("🚀 ~ verifyEmail ~ error:", error)
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(error)
    }
}