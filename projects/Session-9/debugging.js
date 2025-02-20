const winston = require("winston");
const logger = winston.createLogger({
  level : "error", 
  transports: [new winston.transports.File({
    filename: "cenas.log"
  })]
});

class ValidationError extends Error {  
    constructor(message) {  
      super(message);  
      this.bananas = message;  
      logger.info(`ValidationError ${this.bananas} created.`);
    }  
  }  
  try {
    const cenas = false;
    if (!cenas) {
      logger.error("CENAS IS NOT VALID");
      throw new ValidationError("BANG");
    }
    
  } catch (e) {

    if(e instanceof(ValidationError)){
      logger.error("cenas", e);
      console.info("ValidationError");
    } else {
      logger.error(e);
      console.error("Common error");
    }
    
  }