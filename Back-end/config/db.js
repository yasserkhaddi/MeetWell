const express = require("express");
require("dotenv").config();

const { MongoClient } = require("mongodb");

const DB_URL = process.env.DB_URL;
const client = new MongoClient(DB_URL);
const users = client.db("MeetWell").collection("users");
const appoint = client.db("MeetWell").collection("appointments");
const expiredAppoint = client.db("MeetWell").collection("expiredAppointments");
const deletedAppoint = client.db("MeetWell").collection("deletedAppoint");
const days = client.db("MeetWell").collection("days");
const daysOffArchive = client.db("MeetWell").collection("daysOffArchive");


const deletedAppointByAdmin = client
  .db("MeetWell")
  .collection("appointmentsDeletedByAdmin");

module.exports = {
  users,
  appoint,
  expiredAppoint,
  deletedAppoint,
  deletedAppointByAdmin,
  days,
  daysOffArchive,
};
