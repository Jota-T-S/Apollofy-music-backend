import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './routes/user.routes';
import trackRouter from './routes/track.routes';
import albumRouter from './routes/album.routes';
import playlistRouter from './routes/playlist.routes';
import fileUpload from 'express-fileupload';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads/',
    limits: { fileSize: 10000000 }, // 10MB max file(s) size
    abortOnLimit: true // default: false (if true, files will not be uploaded and an error event will be emitted)
  })
);
app.use('/users', userRouter);
app.use('/track', trackRouter);
app.use('/album', albumRouter);
app.use('/playlist', playlistRouter);

export default app;
