import { Request } from 'express';
import User from '../models/mariadb/user';
import { UserI } from '../interfaces/user';


export interface TypedRequestBody<T> extends Express.Request {
    body: T
}