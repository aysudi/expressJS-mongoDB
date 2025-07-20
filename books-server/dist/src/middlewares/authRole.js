const verifyRole = (requiredRoles = []) => {
    return (req, res, next) => {
        const userRole = req?.user.role;
        if (!userRole)
            res.sendStatus(403);
        const rolesArray = Array.isArray(requiredRoles)
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
