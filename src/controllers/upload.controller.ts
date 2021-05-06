import express from 'express';
import { v2 as cloudinary } from 'cloudinary';

class UploadController {
  async upload(req: express.Request, res: express.Response): Promise<void> {
    const { file } = req;

    cloudinary
      .uploader
      .upload_stream({
        resource_type: 'auto'
      }, (error, result) => {
        if (error || !result) {
          return res.status(500).json({
            status: 'error',
            message: error || 'upload error'
          });
        }

        res.status(201).json({
          url: result.url,
          size: Math.round(result.bytes / 1024),
          height: result.height,
          width: result.width
        });
      })
      .end(file.buffer);
  }
}

export default new UploadController();
