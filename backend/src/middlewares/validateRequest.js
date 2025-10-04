// Middleware para validar campos obrigatórios
const validateRequest = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = [];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Campos obrigatórios ausentes',
        missingFields
      });
    }

    next();
  };
};

module.exports = validateRequest;