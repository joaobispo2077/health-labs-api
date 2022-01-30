import { RequestHandler } from 'express';

export abstract class BaseController {
  create?: RequestHandler;
  findById?: RequestHandler;
  findAll?: RequestHandler;
  updateById?: RequestHandler;
  deleteById?: RequestHandler;
}
