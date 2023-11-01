import express from 'express';
import * as path from 'path';
import * as http from 'http';
import bodyParser from 'body-parser';
import { BackendApi } from './routes/backendapi';

class Server { 
    public app: express.Application; 
  
    public static bootstrap(): Server { 
        return new Server(); 
    } 
  
    constructor() { 
        // create expressjs application 
        this.app = express(); 

        //configure application
        this.config();

        //configure routes
        this.routes();
    } 

    private config() {
        //parsers for POST data
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));

        //static path to angular folder
        this.app.use(express.static(path.join('../frontend', 'src')));

        //Get port from environment and store in Express
        const port = process.env.PORT || '3000';
        this.app.set('port', port);

        //Create HTTP server
        const server = http.createServer(this.app);

        //listen on provided port
        server.listen(port, () => {
            console.log(`Api running on localhost:${port}`);
        });
    }

    private routes() {
        //get router
        let router: express.Router;
        router = express.Router();

        //creat routes
        const api: BackendApi = new BackendApi();

        //test API
        router.get('/api/test', api.test.bind(api.test));

        //use router middleware
        this.app.use(router);

        //catch all other routes and return the index file
        this.app.get('*', (req: express.Request, res: express.Response) => {
            res.sendFile(path.join('src/index.html'), { root: '../frontend' })
        })
    }
}

Server.bootstrap();