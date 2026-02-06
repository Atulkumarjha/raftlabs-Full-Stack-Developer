import { Request, Response } from "express";
import { menuItems } from "../models/menu.model";

export const getMenu = (_req: Request, res: Response) => {
    res.status(200).json(menuItems)
}