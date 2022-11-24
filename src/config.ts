import dotenv from 'dotenv';
import bunyan from 'bunyan';

dotenv.config({});

class Config {
  public DATABASE_URL: string | undefined;
  public JWT_SECRET: string | undefined;
  public JWT_LIFETIME: string | undefined;
  public NODE_ENV: string | undefined;
  public SECRET_KEY_ONE: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public CLIENT_URL: string | undefined;
  public REDIS_HOST: string | undefined;

  private readonly DEFAULT_DATABASE_URL =
    // "mongodb+srv://user01:user01@gettingstarted.8v9iq.mongodb.net/chattyapp-backend?authMechanism=DEFAULT";
    'mongodb://localhost:27017/chattyapp-backend';

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
    this.JWT_SECRET = process.env.JWT_SECRET || '1234';
    this.JWT_LIFETIME = process.env.JWT_LIFETIME || '1d';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.REDIS_HOST = process.env.REDIS_HOST || '';
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }

  public validateConfig(): void {
    for (const [key, value] of Object.keys(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined.`);
      }
    }
  }
}

export const config: Config = new Config();
