/*
* Create and export configuration variables
*
*/

// Container for all environments
var environments = {};

// Staging (default) environment
environments.staging = {
  'httpPort' : 3000,
  'httpsPort' : 3001,
  'envName' : 'staging',
  'hashingSecret' : 'thisIsASecret'
};

// Production environment
environments.production = {
  'httpPort' : 5500,
  'httpsPort' : 5501,
  'envName' : 'production',
  'hashingSecret' : 'thisIsASecret'
};


// Determine which environment was passed as a comandline argument

const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not, default to staging
const environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;
