import type { NextApiRequest, NextApiResponse } from "next";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const dotenv = require("dotenv");

dotenv.config();

const {
  OPENAI_API_KEY = "",
  AWS_ACCESS_KEY_ID = "",
  AWS_SECRET_ACCESS_KEY = "",
  AWS_REGION = "us-east-1",
  AWS_BUCKET_NAME = "",
  AWS_BUCKET_REGION = "",
} = process.env;

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

type PromptImageData = {
  selectedColor: string;
  logoStyle: string;
  logoShape: string;
  logoDescription: string;
};

type GeneratedImage = {
  url: string;
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const image = req.body;
    // * 
    // const timestamp = Date.now();
    const prompt = promptImage(image);
    const result = await getImage(prompt);
    const generatedImages = result?.data || [];
    const uploadImages = generatedImages.map((image) => image.url)
    // * Save on S3
    // const uploadImages = await Promise.all(
    //   generatedImages.map(
    //     async (generatedImage: GeneratedImage, index: number) => {
    //       const imageName = `generated-image-${timestamp}.${index}`;
    //       return await uploadToS3(generatedImage.url, imageName);
    //     }
    //   )
    // );
    return res.status(201).json({ url: uploadImages });
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

function promptImage(data: PromptImageData) {
  const { logoDescription, selectedColor, logoStyle, logoShape } = data;
  if (!logoDescription || !selectedColor || !logoStyle || !logoShape) {
    return "";
  }
  return `Generate a ${logoStyle.toLowerCase()}-style ${logoShape.toLowerCase()} icon featuring an ${logoDescription.toLowerCase()}. The primary color of the icon should be ${selectedColor.toLowerCase()}`;
}

async function getImage(prompt: string) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      n: 3,
      size: "1024x1024",
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetching OpenAI failed:", error);
    throw error;
  }
}

async function uploadToS3(imageURL: string, fileName: string) {
  try {
    const imageResponse = await fetch(imageURL);
    const imageArrayBuffer = await imageResponse.arrayBuffer();
    const imageBuffer = Buffer.from(imageArrayBuffer);

    const uploadParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: fileName,
      Body: imageBuffer,
      ContentType: "image/png",
    };

    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);
    console.log(`Image uploaded to S3: ${fileName}`);

    const getObjectParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: fileName,
    };

    const commandGetImage = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, commandGetImage, { expiresIn: 3600 });
    return url;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw error;
  }
}
