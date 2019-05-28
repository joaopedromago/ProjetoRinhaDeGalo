import {Request, Response, NextFunction} from "express";
import { GaloController } from "../controllers/galoController";

export class Routes { 
    
    public galoController: GaloController = new GaloController() 
    
    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        // Contact 
        app.route('/contact')
        .get((req: Request, res: Response, next: NextFunction) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);            
            if(req.query.key !== '78942ef2c1c98bf10fca09c808d718fa3734703e'){
                res.status(401).send('You shall not pass!');
            } else {
                next();
            }                        
        }, this.galoController.get)        

        // POST endpoint
        .post(this.galoController.create);

        // Contact detail
        app.route('/contact/:contactId')
        // get specific contact
        .get(this.galoController.getByID)
        .put(this.galoController.update)
        .delete(this.galoController.delete)

    }
}