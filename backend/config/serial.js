import { SerialPort } from "serialport";
import { ReadlineParser } from '@serialport/parser-readline';

// Insert here the serial port detials
const path = '/dev/cu.usbmodem143201';
const baudRate = 115200;

// Create a serial; port instance
const serialport = new SerialPort({ path: path, baudRate: baudRate});

// create parser
const parser = new ReadlineParser({delimeter: '\r\n'}) ;

// establishes data flow between serial port and emitter
const parsedDataStream = serialport.pipe(parser);

// handle serial data
const handleSerialData = (outputStream) => {
    let isPortOpen = false;

    parsedDataStream.on('data', (data) => {
        if (!isPortOpen) {
            console.log('Serial port is open');
            isPortOpen = true;
        }
        try {
            const jsonData = JSON.parse(data);
            outputStream.write(JSON.stringify(jsonData) + '\r\n');
        } catch (error) {
            console.log('Error parsing JSON data:', error);
        }
    });
}

export { handleSerialData };


