import {InfluxDB} from '@influxdata/influxdb-client';

// Configure InfluxDB connection
const token = process.env.INFLUXDB_TOKEN;
const url = 'https://eu-central-1-1.aws.cloud2.influxdata.com';
const org = 'dev';
const bucket = 'TinyWeather';

const client = new InfluxDB({ url, token });
const writeClient = client.getWriteApi(org, bucket, 'ns');

export { writeClient }