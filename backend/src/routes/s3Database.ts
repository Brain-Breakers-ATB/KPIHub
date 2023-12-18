import express from 'express';
import multer from 'multer';
import AWS, { S3 } from 'aws-sdk';
import fs from 'fs';
import { S3_ACCSESS_KEY, S3_SECRET_ACCSESS_KEY } from "../../config";

const router = express.Router();

type FileDestination = (error: Error | null, filename: string) => void;

const storage: multer.StorageEngine = multer.diskStorage({
    destination: 'uploads/',
    filename: (req: express.Request, file: Express.Multer.File, cb: FileDestination) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

AWS.config.update({
    accessKeyId: S3_ACCSESS_KEY,
    secretAccessKey: S3_SECRET_ACCSESS_KEY,
    region: 'eu-west-2', 
})

const s3: AWS.S3 = new AWS.S3();

router.post('/postFile', upload.single('demo_file'), (req: express.Request, res: express.Response) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
      }
      uploadFile(req.file.path, req.file.filename, res);
})

router.get('/getFile/:fileName', (req: express.Request, res: express.Response) => {
    retriveFile(req.params.fileName, res);
})

router.get('/getFolderFile/:foldername/:filename', (req: express.Request, res: express.Response) => {
    retriveFolderFile(req.params.foldername, req.params.filename, res);
})

router.get('/getKeyFile', (req: express.Request, res: express.Response) => {
    if (typeof req.query.Key !== 'string') {
        return res.status(400).send({ message: 'No file uploaded' });
    }
    retriveKeyFile(req.query.Key, res);
})

function uploadFile(source: string, targetName: string, res: express.Response){
    console.log('preparing to upload...');
    fs.readFile(source, (err, filedata) => {
        if (!err) {
          const putParams = {
              Bucket      : 'kpi-hub-bucket',
              Key         : targetName,
              Body        : filedata
          };
          s3.putObject(putParams, (err: AWS.AWSError, data: S3.GetObjectOutput) => {
            if (err){
                console.log('Could not upload the file. Error :',err);
                return res.send({success:false});
            }
            else {
                console.log('Successfully uploaded the file');
                return res.send({success:true});
            }
            });
        }
        else{
            console.log({'err': err});
        }
    })
}

function retriveFile(filename: string, res: express.Response) {
    const getParams ={
        Bucket: 'kpi-hub-bucket',
        Key: filename,
    };

    s3.getObject(getParams, (err: AWS.AWSError, data: S3.GetObjectOutput) => {
        if (err) {
            return res.status(400).send({success:false,err:err});
        }
        else {
            return res.send(data.Body);
        }
    });
}

function retriveFolderFile(foldername: string, filename: string, res: express.Response) {
    const getParams  = {
        Bucket: 'kpi-hub-bucket',
        Key: foldername + '/' + filename,
    };

    s3.getObject(getParams, (err: AWS.AWSError, data: S3.GetObjectOutput) => {
        if (err) {
            return res.status(400).send({success:false,err:err});
        }
        else {
            return res.send(data.Body);
        }
    });
}

function retriveKeyFile(Key: string, res: express.Response) {
    const getParams ={
        Bucket: 'kpi-hub-bucket',
        Key: Key,
    };

    s3.getObject(getParams, (err: AWS.AWSError, data: S3.GetObjectOutput) => {
        if (err) {
            return res.status(400).send({success:false,err:err});
        }
        else {
            return res.send(data.Body);
        }
    });
}

export { router as S3Router };