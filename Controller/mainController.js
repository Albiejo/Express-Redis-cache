import inMemory from "../Model/Model.js";
import pkg from 'express';
const { Request, Response } = pkg;
import redisClient from "../Cache/redis.js";
import { RedisSearchLanguages } from "redis";

class mainController {

  async getService(req , res) {
    try {
      
      const cacheddata = await redisClient.get('data')

      if(cacheddata){
        console.log('Cache hit');
        //data coming from cache only 
        return res.status(200).json(JSON.parse(cacheddata))
      }
      
      //if data not in redis then , db is fetched
      console.log('Cache miss');

      const data = await inMemory.getData();

      //setting data in redis with a 60 sec expiration
      await redisClient.setEx('data',60 , JSON.stringify(data))
      
      res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  }

  async postService(data) {
    try {
      await inMemory.addData(data);
      res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  }

}


export default new mainController();