module.exports = {
    getLevel:  
    /**
    * @param ${string or number} user
    */
  async function(level) {
     const axios = require('axios')
      let uri = '';
       if(typeof level === "string" || "number") {
           uri = `https://gdbrowser.com/api/level/${level}`
           let result = await axios.get(uri).catch(error => {
           })
           return result.data;
       }
  }
}

