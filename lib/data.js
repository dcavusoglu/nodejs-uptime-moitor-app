/*
* Library for storing and editing data
*
*/

// Dependencies
var fs = require('fs');
var path = require('path');

// Container for the module ( to be exported)
var lib = {};

// Base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');


// Write data to a file
lib.create = function(dir, file,data,callback){
  // Open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', function(err,fileDescriptor){
    if(!err && fileDescriptor) {
      // Convert data to string
      const stringData = JSON.stringify(data);

      //Write to file and close it
      fs.writeFile(fileDescriptor, stringData, function(err){
        if(!err){
          fs.close(fileDescriptor, function(err){
            if(!err){
              callback(false);
            } else {
              callback('Error closing new file!');
            }
          });
        } else {
          callback('Error writing to new file!');
        }
      });

    } else {
      callback('Could not create a file, it may already exist');
    }
  });
};

// Read data from a file
lib.read = function(dir, file, callback){
  fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf-8', function(err, data){
    callback(err,data);
  })
};

// Updating an existing file
lib.update = function(dir,file,data,callback){
  fs.open(lib.baseDir+dir+'/'+file+'.json', 'r+', function(err,fileDescriptor){
    if(!err && fileDescriptor){
      const stringData = JSON.stringify(data);

      // Truncate the file
      fs.truncate(fileDescriptor, function(err){
        if(!err){

          // Write to the file
          fs.writeFile(fileDescriptor, stringData, function(err){
            if(!err){
              fs.close(fileDescriptor, function(err){
                if(!err){
                  callback(false)
                } else {
                  callback('Error closing existing file');
                }
              })
            } else {
              callback('Error writing existing file');
            }
          })
        } else {
          callback('Error turnicating file!');
        }
      })
    } else {
      callback('Could not open the file for updates, it may not exist yet');
    }
  });
};


// Delete a file
lib.delete = function(dir, file, callback){
  // Unlink the file
  fs.unlink(lib.baseDir+dir+'/'+file+'.json', function(err){
    if(!err){
      callback(false);
    } else {
      callback('Error deleting file');
    }
  });
}







// export the module
module.exports = lib;
