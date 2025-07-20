import { NextFunction, Response } from "express";

const verifyRole = (requiredRoles: string[] = []) => {
  return (req: any, res: Response, next: NextFunction) => {
    const userRole: string = req?.user.role;

    if (!userRole) res.sendStatus(403);

    const rolesArray: any = Array.isArray(requiredRoles)
      ? requiredRoles
      : [requiredRoles];

    if (!rolesArray.includes(userRole)) {
      res.json({
        message: "Forbidden: Insufficient role",
        statusCode: 403,
      });
    }

    next();
  };
};

export default verifyRole;
