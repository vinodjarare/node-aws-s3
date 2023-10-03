import { S3Client,GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import dotenv from "dotenv";

dotenv.config();

const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
  },
});

async function getObjectUrl(key){
    const command = new GetObjectCommand({
        Bucket: process.env.BUCKET,
        Key: key
    })

    const url = await getSignedUrl(s3Client, command);
    // const url = await getSignedUrl(s3Client, command,{expiresIn:10});

    return url;
}

async function putObjectUrl(filename,contentType){
    const command = new PutObjectCommand({
        Bucket: process.env.BUCKET,
        Key: `/uploads/user-uploads/${filename}`,
        ContentType: contentType
    })

    const url = await getSignedUrl(s3Client, command,{expiresIn:240});
    // const url = await getSignedUrl(s3Client, command,{expiresIn:10});

    return url;
}


async function init(){
console.log("url for 4129737.png",await getObjectUrl("/uploads/user-uploads/image-1696356852673.jpg"))
}


// for put object

// async function init(){
//     console.log("url for 4129737.jpg",await putObjectUrl(`image-${Date.now()}.jpg`,"image/jpg"))
// }

init();