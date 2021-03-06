const radPoint = (180/Math.PI); //57.29577951308232
const kilometerMultiplier = 6378.8;
const mileMultiplier = 3963;
const inMemoryCache = {};

const calculateDistance = (pointA, pointB, unit = "K")  => {
    // console.log(pointA, pointB);
    let { lat1, long1 } = pointA;
    let { lat2, long2 } = pointB;
    let multiplier = unit  === "K" ? kilometerMultiplier : mileMultiplier;

    // convert degrees to radians.
    // divide the values of longitude and latitude of both the points by 180/pi
    // The value of pi is 22/7

    let rLat1 = Number(lat1) / radPoint;
    let rLong1 = Number(long1) / radPoint;

    let rLat2 = Number(lat2) / radPoint;
    let rLong2 = Number(long2) / radPoint;

    //Haversine formula
    let dLon = rLong2 - rLong1;
    let dLat = rLat2 - rLat1;

    let a = Math.pow(Math.sin(dLat / 2), 2) +
            Math.cos(rLat1) * Math.cos(rLat2) * Math.pow(Math.sin(dLon / 2),2);
    let c = 2 * Math.asin(Math.sqrt(a));

    return c * multiplier;

}
exports.calculateDistance = calculateDistance;

const sendFailureResp = (res) => (error) => {
    return res.send({
        success: false,
        message: error || 'Something went wrong. Please try after some time'
    });
}
exports.sendFailureResp = sendFailureResp;

const sendSuccessResp = (res, message) => (data) => {
    return res.send({
        success: true,
        data,
        message
    })
}
exports.sendSuccessResp = sendSuccessResp;


const setCache = (key, data) => {
    if (key && data) {
        inMemoryCache[JSON.stringify(key)] = JSON.stringify(data);
    }
}
exports.setCache = setCache;

const getCache = (key) => {
    key = JSON.stringify(key);
    if (inMemoryCache[key]) {
        return JSON.parse(inMemoryCache[key]);
    }
    return [];
}
exports.getCache = getCache;