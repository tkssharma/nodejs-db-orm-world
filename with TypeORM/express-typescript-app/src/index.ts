if (!process.env.ALREADY_SET) { require('dotenv').config(); }

import * as http from 'http';
import { app } from './app';
import { Logger } from './lib/logger';
import { DatabaseService } from './app/services/DatabaseService';
// Composition root

const logger: any = new Logger();

const server = http.createServer(app).listen(parseInt(process.env.PORT || '3000', 10));
server.on('listening', async () => {
    DatabaseService.getConnection();
    logger.log('info', `Sample app listening on ${JSON.stringify(server.address())}`);
});


