import redis from 'redis';


const redisClient = redis.createClient({
    socket:{
        host:'127.0.0.1',
        port: 6379
    }
});



redisClient.on('connect' , ()=>{
    console.log("connected to redis..");
    
})



redisClient.on('error',(err)=>{
    console.error(`redis error occurred ${err}`)
})


// await redisClient.connect();


//rate limiting using redis 
//basic concept is:
// Use the client's IP address (or another unique identifier) as the key.
// Increment a counter in Redis for that key.
// Set an expiration time (e.g., 60 seconds) for the key.
// Deny the request if the counter exceeds the allowed limit.


export const rateLimiter = (limit, windowseconds)=>{
    return async(req , res, next)=>{
        try {
            const Ip = req.ip; // using IP address as key since it is unique
            const key = `rate:${Ip}`


            //incrementing the req count for this Ip 
            const currentcount = await redisClient.incr(key);

            if(currentcount===1){
                // Set the expiration time if it's the first request
                await redisClient.expire(key , windowseconds)
            }
            

            if(currentcount  > limit){
                //limit exceed
                return res.status(429).json({error:"Too many request , try again later.."})
            }


            next();
            //allowing the request to proceed.

        } catch (error) {
            console.error(`error in rate limiting middleware ${error}`)
            res.status(500).json({error:"Internal server error.."})
        }
    }
}

export default redisClient;

