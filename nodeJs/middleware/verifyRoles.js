const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req?.roles) return res.sendStatus(401);
      const rolesArray = [...allowedRoles];
      const result = req.roles.map((role) => rolesArray.includes(role))
        .find((val) => val == true);
      if (!result) return res.status(201).send({message:rolesArray});
      next();
    };
  };
  
  module.exports = verifyRoles;