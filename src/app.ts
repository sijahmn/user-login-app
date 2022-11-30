import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import * as dotenv from 'dotenv';
import morgan from 'morgan'
import { mongoConnection } from './db/connection'
import userRouter from "./routers/user.router";

// Env configuration
dotenv.config()
//express
const app = express();
const httpServer = createServer(app);
// Socket server creation
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
// Express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"))

// Routes

app.use("/api/v1/user", userRouter)


// Base Route

app.get("/", (req, res) => {
  res.json("connected to port 3000")
})

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Port setting and database connection
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(` Server is listening at ${PORT}`);
  mongoConnection()
});