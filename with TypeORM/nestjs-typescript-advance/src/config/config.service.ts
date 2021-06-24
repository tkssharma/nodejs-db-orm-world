import { Injectable } from '@nestjs/common';

import { DEFAULT_CONFIG } from './config.default';
import { ConfigData, ConfigDBData } from './config.interface';

/**
 * Provides a means to access the application configuration.
 */
@Injectable()
export class ConfigService {
  private config: ConfigData;

  constructor(data: ConfigData = DEFAULT_CONFIG) {
    this.config = data;
  }

  /**
   * Loads the config from environment variables.
   */
  public lofusingDotEnv() {
    this.config = this.parseConfigFromEnv(process.env);
    console.log(this.config);
  }

  private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.NODE_ENV || DEFAULT_CONFIG.env,
      port: env.PORT ? parseInt(env.PORT, 10) : DEFAULT_CONFIG.port,
      db: this.parseDbConfigFromEnv(env) || DEFAULT_CONFIG.db,
      logLevel: env.LOG_LEVEL || DEFAULT_CONFIG.logLevel,
    };
  }

  private parseDbConfigFromEnv(env: NodeJS.ProcessEnv): ConfigDBData {
    return {
      type: env.DB_TYPE || '',
      user: env.MYSQL_USER || '',
      pass: env.MYSQL_PASSWORD || '',
      name: env.MYSQL_DB || '',
      host: env.MYSQL_DB_HOST || '',
      port: parseInt(env.MYSQL_DB_PORT || 'NaN', 10),
      dialect: env.DB_DIALECT || '',
      charset: env.DB_CHARSET || '',
      collate: env.DB_COLLATE || '',
    };
  }
  public get(): Readonly<ConfigData> {
    return this.config;
  }
}

/*
@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);

  private envPath: any;
  private readonly nodeEnv: string = process.env.NODE_ENV
    ? process.env.NODE_ENV
    : 'development';

  private readonly envConfig: { [key: string]: string };
  constructor() {
    this.logger.log('SERVICE INIT');
    switch (this.nodeEnv) {
      case 'test':
        this.envPath = path.resolve(__dirname, '../../.env');
        break;
      case 'production':
        this.envPath = path.resolve(__dirname, '../../.env');
        break;
      case 'development':
        this.envPath = path.resolve(__dirname, '../../.env');
        break;
      default:
        throw new Error('Specify the NODE_ENV variable');
    }
    this.envConfig = dotenv.parse(fs.readFileSync(this.envPath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
*/
