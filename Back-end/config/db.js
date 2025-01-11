const express = require("express");
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");
const users = client.db("MeetWell").collection("users");
const appoint = client.db("MeetWell").collection("appointments");
const expiredAppoint = client.db("MeetWell").collection("expiredAppointments");
const deletedAppoint = client.db("MeetWell").collection("deletedAppoint");

module.exports = { users, appoint, expiredAppoint, deletedAppoint };
