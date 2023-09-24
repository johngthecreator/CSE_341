import express, { Express, Request, Response } from 'express';
export const indexRoute = (req: Request, res: Response) => {
    res.send('John Gorriceta');
  }