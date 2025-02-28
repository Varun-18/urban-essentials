import { AuthRequest } from 'declaration';
import { Response } from 'express';

import { RES_MESSAGES, STATUS_CODES } from 'constant';

export const getCartDetails = async (req: AuthRequest, res: Response) =>{
    try {
        const user = req.user;
        
        

        
    }catch(error){
        res.status(STATUS_CODES.UNAUTHORIZED)
        .json({ message: RES_MESSAGES.UNAUTHORIZED });

        return;
    }
}
