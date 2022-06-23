const User = require("../models/User");

// Display a listing of users.
async function index(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

// Display the specified user.
async function show(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

// Store a newly created user in storage.
async function store(req, res) {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

// Update the specified user in storage.
async function update(req, res) {
  const { firstName, lastName, email, phone } = req.body;
  try {
    //SI NO ENCUENTRA EL PRODUCTO POR SU ID EN LA DB DEVUELVE 'null', AUN NO ENCONTRE COMO CONFIGURAR PARA DEVOLVER MSJ DE ERROR ACORDE.
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { firstName, lastName, email, phone },
      { new: true },
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

// Remove the specified user from storage.
async function destroy(req, res) {
  try {
    // const user = await User.findById(req.params.id);
    // if (!user) {
    //   return res.status(404).json({ msg: "Cannot find user" });
    // }
    // const deletedUser = await User.deleteOne({ _id: req.params.id });
    // res.status(200).json(deletedUser);
    //
    //DEJO 2 VERSIONES, USANDO LA 2NDA SI NO ENCUENTRA EL PRODUCTO POR SU ID EN LA DB DEVUELVE 'null', AUN NO ENCONTRE COMO CONFIGURAR PARA DEVOLVER MSJ DE ERROR ACORDE. PRIMERA OPCION SI PODEMOS FILTRAR EN CASO NO ENCUENTRE EL PRODUCTO Y DEVOLVER MSJ ACORDE.
    //
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
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
