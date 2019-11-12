import * as Ioredis from "ioredis";
import { redisConfig } from "@config/redis";
let client: Ioredis.Redis = null;
export class IRedis {
  static _instance: IRedis = null;
  static getInstance(): IRedis {
    if (IRedis._instance == null) {
      return (IRedis._instance = new IRedis());
    } else {
      return IRedis._instance;
    }
  }
  static async init() {
    return new Promise(resolve => {
      client = new Ioredis(redisConfig);
      client.on("error", error => {
        console.log("链接redis失败", error);
        resolve(false);
      });
      client.on("ready", () => {
        resolve(true);
        console.log("redis-client");
      });
    });
  }
  async get(key: string) {
    return await client.get(key);
  }
  async set(key: string, value: any, time?: number | string) {
    if (time == null) {
      return await client.set(key, value);
    } else {
      return await client.set(key, value,'EX',time);
    }
  }
  async hset(key: Ioredis.KeyType, field: string, value: any) {
    return await client.hset(key, field, value);
  }
  async hget(key: Ioredis.KeyType, field: string) {
    return await client.hget(key, field);
  }
}
// IRedis.getInstance();
