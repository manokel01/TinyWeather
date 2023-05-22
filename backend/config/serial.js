import { SerialPort } from "serialport";
import { ReadlineParser } from '@serialport/parser-readline';

// Serial port configuration
const path = '/dev/cu.usbmodem143201';
const baudRate = 115200;

// Create a serial; port instance
const serialport = new SerialPort({ path: path, baudRate: baudRate});

// create parser
const parser = new ReadlineParser({delimiter: '\r\n'}) ;

// establishes data flow between serial port and emitter
const dataStream = serialport.pipe(parser);

export { dataStream };