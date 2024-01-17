const handleErrorResponse = (res, error, statusCode) => {
  console.error(error);
  res.status(statusCode).send('Internal Server Error');
};

const Controller = {
  getAll: async (req, res) => {
    try {
      return res.send('Generated controller')
    } catch (error) {
      handleErrorResponse(res, error, 500);
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const idInt = parseInt(id);
    try {
      return res.send('Generated controller')
    } catch (error) {
      handleErrorResponse(res, error, 500);
    }
  },

  create: async (req, res) => {
    try {
      return res.send('Generated controller')
    } catch (error) {
      handleErrorResponse(res, error, 500);
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const idInt = parseInt(id);

    if (isNaN(idInt) || idInt <= 0) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    try {
      return res.send('Generated controller')
    } catch (error) {
      handleErrorResponse(res, error, 500);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const idInt = parseInt(id);

    if (isNaN(idInt) || idInt <= 0) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    try {
      return res.send('Generated controller')
    } catch (error) {
      handleErrorResponse(res, error, 500);
    }
  },
};

export default Controller;