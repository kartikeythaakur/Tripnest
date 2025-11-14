import cloudinary from '../config/cloudinary.js';

// Helper function to upload one file
const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({ folder: 'Tripnest/Properties' }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result); // Resolves with the Cloudinary upload result
        }
      }
    );
    // Send the file buffer to Cloudinary
    uploadStream.end(file.buffer);
  });
};

// The new middleware for MULTIPLE files
export const uploadMultipleToCloudinary = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next(new Error('No files uploaded!'));
  }

  try {
    // Create an array of upload promises
    const uploadPromises = req.files.map(file => uploadFile(file));
    
    // Wait for all files to upload
    const results = await Promise.all(uploadPromises);

    // Attach the URLs and public_ids to the request
    req.body.imageUrls = results.map(result => result.secure_url);
    req.body.imagePublicIds = results.map(result => result.public_id);
    
    next();
  } catch (error) {
    return next(error);
  }
};