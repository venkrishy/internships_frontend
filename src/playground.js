//using axios to fetch data from https://www.boredapi.com/api/activity
const axios = require('axios');
(async() => { 
    const result = await API.graphql(graphqlOperation(createInternHive, {
        input: {
            "name": "Akuna Capital",
            "location": "Chicago, IL; Austin, TX; Boston, MA",
            "notes": "Quant Trading, SWE (sponsorship available)"
        }
      }))
    console.log(result);
  }
)();
(async () => {
    const combine = async () => {
        try {
            // surround with try catch block
            try {
                const response = await axios.get('https://www.boredapi.com/api/activity');
            } catch (error) {
            }

            const response2 = await axios.get('https://httpstat.us/404');
            return response2;
        } catch (error) {
            console.log("error is :", error);
        }
    }
    combine();
})();






console.log("done")
