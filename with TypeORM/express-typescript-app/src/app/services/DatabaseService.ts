import {createConnection} from 'typeorm';
import Config from '../../config/config';
import { EventEmitter } from 'events';
import { Logger } from '../../lib/logger';

class DatabaseService {

    public static Emitter:EventEmitter = new EventEmitter();
    public static logger:any = new Logger();

    public static async getConnection(){
        DatabaseService.registerEvent();
        return await DatabaseService.createConnection();
    }
    static async registerEvent() {
        DatabaseService.Emitter.on('DB_CONN_ERROR', async () => {
            DatabaseService.logger.log('info', 'database conn error.. retrying..');
            setTimeout( async() => {
             await DatabaseService.createConnection();
            }, 3000)
        })
    }
    static async createConnection() {
        // get DB config 
        const dbConfig = Config[`${process.env.ENV}`]
        return await createConnection({
            type: 'mysql',
            host: dbConfig.host,
            port: parseInt(dbConfig.port),
            username: dbConfig.username,
            password: dbConfig.password,
            database: dbConfig.database,
            entities: [
              
            ],
        }).then(() => {
           DatabaseService.logger.log('info', 'Connected successfully');
        }).catch((err:Error)=> {
            // now do retry //
            DatabaseService.logger.log('info', 'Connection error...Emitting event');
            DatabaseService.Emitter.emit('DB_CONN_ERROR');

        })
    }

}

export { DatabaseService};