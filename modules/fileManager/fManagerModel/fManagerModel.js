const db = require('../../../db/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { File_Manager, Book} = require("../../../db/DatabaseTables");

class fManagerModel {
    static fileCounter = 0;

    constructor() {
        // Define the storage configuration
        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {

                const folder = 'books';
                const uploadPath = path.join(__dirname, `../../../public/uploads/${folder}`);
                fs.mkdirSync(uploadPath, { recursive: true });
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                // Generate a unique new name for the file
                const currentDate = new Date().toISOString().replace(/[:-]/g, '').slice(0,8); // Remove colons and hyphens
                const currentTime = new Date().toISOString().replace(/[:-]/g, '').slice(9,15); // Remove colons and hyphens
                const new_name = `${currentDate}-${currentTime}-${fManagerModel.fileCounter++}${path.extname(file.originalname)}`;
                cb(null, new_name);
            },
        })

        // const maxCount = 1; // Define the maximum number of files to upload (adjust as needed)
        this.upload = multer({ storage: this.storage });

        // this.uploadMiddleware = this.upload.array('files', 1);
    }

    async uploadFile(fileData) {
        // console.log(fileData)
        try {
            // Access the uploaded file details from the fileData parameter
            const { originalname, filename } = fileData;
            // console.log(originalname , filename)
            const folder = 'books';

            const new_path = `uploads/${folder}/${filename}`;

            let [file_id] = await db(File_Manager).insert({
                old_name: originalname, new_name: filename, folder, path: new_path
            });

            return {
                file_id,
                message: 'File uploaded successfully',
                file: { original_name: originalname, new_name: filename, folder, path: new_path },
            };
        } catch (error) {
            console.error('Error uploading and inserting file:', error);
            throw error;
        }

    }

    async getBookFile(book_id) {
        try {
            const bookFile = await db(Book).where('book_id', book_id);
            const fileData = await db(File_Manager).where('file_id', bookFile.book_file);
            return fileData[0];

        } catch (error) {
            console.error('Error fetching user files:', error);
            throw error;
        }
    }

    async deleteFile(file_id) {
        try {
            // Fetch file details from the database
            const fileDetails = await db(File_Manager).where('file_id', file_id );

            if (fileDetails.length === 0) {
                new Error('File not found');
            }

            const { folder, new_name } = fileDetails[0];

            // Delete the file from the server's file system
            const filePath = `${__dirname}/../../../public/uploads/${folder}/${new_name}`;
            // console.log(filePath)
            await fs.unlink(filePath, async (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    throw err;
                }

                // Delete the file record from the database
                await db(File_Manager)
                    .where({file_id})
                    .del();

            });

            return { message: 'File deleted successfully' };
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    }

}

module.exports = new fManagerModel();
