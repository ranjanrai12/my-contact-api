const contactModel = require("../models/contactModel");

const expresshandler = require("express-async-handler");

/**
 * @GET all contacts
 * @route /api/contact
 * @access public
 */
const getContacts = expresshandler(async (req, res, next) => {
  const contact = await contactModel.find({ user_id: req.user.id });
  console.log(contact);
  res.status(200).json(contact);
});

/**
 * @GET individual contacts
 * @route /api/contact/:id
 * @access public
 */
const getContact = expresshandler(async (req, res, next) => {
  const contact = (await contactModel.findById(req.params.id)) || [];
  if (!contact) {
    res.status(404);
    throw new Error("Contact is not found");
  }
  res.status(200).json(contact);
});

/**
 * @POST individual contacts
 * @route /api/contact
 * @access public
 */
const createContact = expresshandler(async (req, res, next) => {
  console.log("the request body is ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const contact = await contactModel.create({
    name,
    email,
    phone,
    user_id: req.user.id,
    admin: req.user.userName,
  });
  res.status(201).json(contact);
});
/**
 * @PUT update contacts
 * @route /api/contact/:id
 * @access public
 */
const updateContact = expresshandler(async (req, res, next) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact is not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have permission to update the other user contacts"
    );
  }
  const updatedContact = await contactModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});
/**
 * @DELETE delete contacts
 * @route /api/contact/:id
 * @access public
 */
const deleteContact = expresshandler(async (req, res, next) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact is not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have permission to delete the other user contacts"
    );
  }
  await contactModel.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
