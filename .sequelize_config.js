var config = require("./config.json");

["development", "production", "test"].forEach(function(env){
    if(!config[env])
        return;

    module.exports[env] = config[env].db;
});
