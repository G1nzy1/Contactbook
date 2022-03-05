
const Contact = require("../models/contact.model");
const { BadRequestError } = require("../errors");
const mongoose = require("mongoose");
exports.create = async(req, res, next) => {
    if(!req.body.name){
        return next(new BadRequestError(400, "Name cannot be empty"));
    }
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        favorite: req.body.favorite === true,
    });
    try{
        const document = await contact.save();
        return res.send(document);
    }
    catch(error){
        return next(
            new BadRequestError(500, "An error occurred while craeting the contact")
        );
    }
};
exports.findAll = async(req, res, next) => {
    const condition = { };
    const {name} = req.query;
    if(name){
        condition.name = {$regex: new RegExp(name), $options: "i"};
    }
    try{
        const document = await Contact.find(condition);
        return res.send(document);
    }
    catch(error){
        return next(
            new BadRequestError(500, "An error occurred while retriveving contact")
        );
    }
};
exports.findOne = async(req, res, next) => {
    const {id} = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
    try{
        const document = await Contact.findOne(condition);
        if(!document){
            return next(new BadRequestError(404, "Contact not found"));
        }
        return res.send(document);
    }
    catch(error){
        return next(
            new BadRequestError(500, `Error retriveving contact with id = ${req.params.id}`)
        );
    }
};
exports.update = async(req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new BadRequestError(400, "Data to update cannot be empty"));
    }
    const{id} = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id: null,
    };
    try{
        const document = await Contact.findOneAndUpdate(condition, req.body,{
            new: true,
        });
        if(!document){
            return next(new BadRequestError(404, "Conract not found"));
        }
        return res.send({message: "Contact was updated successfully"});
    }
    catch(error){
        return next(
            new BadRequestError(500, `Error updating contact with id = ${req.params.id}`)
        );
    }
};
exports.delete = async(req, res, next) => {
    const {id} = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id: null,
    };
    try{
        const document = await Contact.findOneAndDelete(condition);
        if(document){
            return next(new BadRequestError(404, "Contact not found"));
    }
        return res.send({message: "Contact was delete successfully"});
    }
    catch(error){
        return next(
            new BadRequestError(500, `Error delete contact with id = ${req.params.id}`)
        );
    }
};
exports.deleteAll = async(req, res, next) => {
    try{
        const data = await Contact.deleteMany({});
        return res.send({
            message: `${data.deletedCount} contact were deleted successfully`,
        });
    }
    catch(error){
        return next(
            new BadRequestError(500, "An error occurred while removing all contact")
        );
    }
};
exports.findAllFavorite = async(req, res, next) => {
    try{
        const document = await Contact.find({favorite: true});
        return res.send(document);
    }
    catch(error){
        return next(
            new BadRequestError(500, "An error occurred while retrieving favorite contact")
        );
    }
};