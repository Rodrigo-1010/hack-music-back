const Admin = require("../models/Admin");


// Display a listing of admins.
async function index(req, res) {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

// Display the specified admin.
async function show(req, res) {
  try {
    const admin = await Admin.findById(req.params.id);
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

// Store a newly created admin in storage.
async function store(req, res) {
  if (req.body.firstName && req.body.lastName && req.body.email) {
    try {
      const newAdmin = await Admin.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
      });
      res.status(201).json(newAdmin);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  } else {
    res.status(400).json({ msg: err.message }); //Bad request
  }
}

// Update the specified admin in storage.
async function update(req, res) {
  const { firstName, lastName, email, phone } = req.body;
  try {
    //SI NO ENCUENTRA EL PRODUCTO POR SU ID EN LA DB DEVUELVE 'null', AUN NO ENCONTRE COMO CONFIGURAR PARA DEVOLVER MSJ DE ERROR ACORDE.
    const updatedAdmin = await Admin.findByIdAndUpdate(
      { _id: req.params.id },
      { firstName, lastName, email, phone },
      { new: true },
    );
    res.status(200).json(updatedAdmin);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

// Remove the specified admin from storage.
async function destroy(req, res) {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedAdmin);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
