import { NextApiRequest as Request, NextApiResponse as Response } from "next";

export default function (request: Request, response: Response) {
  const { authorization } = request.headers;

  return response.status(201).json({ token: authorization });
}
