const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const redis = require('redis');
const redisClient = require("../config/redisClient");


const getProperties = async (req, res, next) => {

    try {
        const property = await prisma.properties.findMany({});

        const client = await redisClient();
        const sendData = { status: true, properties: property };
        client.set('propertyData', JSON.stringify(sendData));
        res.status(200).json(sendData);

    } catch (err) {

        console.log("ER-->", err);
        res.status(500).json({
            message: "something went wrong !!"
        })
    }
}

const catchPropertyData = async (req, res, next) => {

    const client = await redisClient();
    const cacheData = await client.get('propertyData');
    res.status(200).json(JSON.parse(cacheData));

}


const addProperty = async (req, res, next) => {

    const body = req.body;

    try {
        const property = await prisma.properties.create({
            data: {
                name: body.name,
                rentAgreementDate: new Date(body.rentAgreementDate).toISOString(),
                type: body.type,
                landLoadFullName: body.landLoadFullName,
                address: body.address,
                mobileNumber: body.mobileNumber,
                bankAccountNumber: body.bankAccountNumber,
                bankName: body.bankName,
                bankAddress: body.bankAddress,
                paymentSchedule: body.paymentSchedule,
                rentAmount: body.rentAmount,
                IFSCcode: body.IFSCcode
            }
        })
        const client = await redisClient();
        client.DEL("propertyData");

        res.status(200).json({ status: true, message: 'Property created successfully', property });
    } catch (error) {

        console.log(error);
        res.status(500).json({
            message: "something went wrong"
        })
    }
}

const updateProperty = async (req, res, next) => {

    const uuid = req.params.uuid;
    const body = req.body;

    try {
        const client = await redisClient();
        const property = await prisma.properties.update({
            where: {
                uuid: uuid
            },
            data: {
                name: body.name,
                rentAgreementDate: new Date(body.rentAgreementDate).toISOString(),
                type: body.type,
                landLoadFullName: body.landLoadFullName,
                address: body.address,
                mobileNumber: body.mobileNumber,
                bankAccountNumber: body.bankAccountNumber,
                bankName: body.bankName,
                bankAddress: body.bankAddress,
                paymentSchedule: body.paymentSchedule,
                rentAmount: body.rentAmount,
                IFSCcode: body.IFSCcode
            }
        })

        client.DEL("propertyData");

        res.status(200).json({ status: true, message: 'Property updated successfully', property });
    } catch (error) {

        ///  console.log(error);
        res.status(500).json({
            message: "something went wrong"
        })
    }
}

const removeProperty = async (req, res, next) => {

    const uuid = req.params.uuid;

    try {
        const property = await prisma.properties.delete({
            where: {
                uuid: uuid
            }
        })
        res.status(200).json({ status: true, message: 'Property deleted successfully', property });
    } catch (error) {

        //console.log(error);
        res.status(500).json({
            message: "something went wrong"
        })
    }
}

module.exports = {
    addProperty,
    updateProperty,
    getProperties,
    removeProperty,
    catchPropertyData
}