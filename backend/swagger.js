/**
 * Object containing options for Swagger documentation generation.
 * @typedef {Object} SwaggerOptions
 * @property {Object} swaggerDefinition - The definition of the Swagger document.
 * @property {Object} swaggerDefinition.info - The information about the API.
 * @property {string} swaggerDefinition.info.title - The title of the API.
 * @property {string} swaggerDefinition.info.version - The version of the API.
 * @property {string} swaggerDefinition.info.description - The description of the API.
 * @property {string} swaggerDefinition.openapi - The version of the OpenAPI specification used.
 * @property {string[]} apis - An array of file paths to the endpoints to document.
 */

/**
 * Options for generating Swagger documentation.
 * @type {SwaggerOptions}
 */
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specify the version of the OpenAPI specification used
    info: {
      title: 'TinyWeather API', // The title of the API
      version: '1.0.0', // The version of the API
      description: 'A farm management and weather monitoring system. For more info visit https://github.com/manokel01/TinyWeather', // The description of the API
      contact: {
        email: 'manokel@gmail.com', // The email of the API contact person
      },
      license: {
        name: 'Licence: MIT', // The name of the license
        url: 'https://opensource.org/license/mit/' // The URL of the license
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/' // The URL of the API server
      }
    ]
  },
  apis: ['./routes/*.js'] // An array of file paths to the endpoints to document.
};

/**
 * Exports the swaggerOptions object.
 * @exports swaggerOptions
 */
export { swaggerOptions };