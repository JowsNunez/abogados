import { AuthController } from "../controller/auth.controller";
import { NextFunction, Request, Response, Router } from "express";

export class AuthRouter{
    private router:Router;
    private authController:AuthController;
    constructor(authController:AuthController){
        this.authController=authController;
        this.router=Router();
        this.init();
    }

    private init(){
        this.router.post('/login',this.login.bind(this));
    }

    private async login(req:Request,res:Response){
        return this.authController.login(req,res);
    }

    public getRouter():Router{
        return this.router;
    }
}