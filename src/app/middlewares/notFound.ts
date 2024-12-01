import { NextFunction, Request, Response } from "express";




const notFound = async  (req: Request, res: Response, next: NextFunction) => {
  
  const { default: httpStatus } = await import('http-status');
    res.status(httpStatus).json({
      success: false,
      message: 'Api not found',
      error: '',
    });
  };

  export default notFound;