
async function externalApiCall() {
    try {
        console.log("fetchingggggg")
        const result = await fetch("http://randam-data-api.com/api/appliance/random_appliance");
        return result.data; 
    } catch (error) {
       return {msg: 'Error'}
    }
    
}


async function fetchApiWithAutoretry(ApiCall, maxcount, retrycount=1) {
    while (retrycount < maxcount) {
        const response = await ApiCall()
        if(response && response.msg === 'Error'){
            ++retrycount
            if(retrycount < maxcount){
                return await fetchApiWithAutoretry(ApiCall, maxcount,retrycount)

            }
            return {msg: "API failed after retry also."}
        }
        console.log(response)
    }
}

// Auto Retry when a network call fails
// fetchNews

// fetchWithAutoRetry(fetchNews,5)

function fetchWithAutoRetry(fetcher, maxRetryCount) {
    return new Promise((resolve, reject) => {
      let retries = 0;
      const caller = () =>
        fetcher()
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            if (retries < maxRetryCount) {
              retries++;
              caller();
            } else {
              reject(error);
            }
          });
      retries = 1;
      caller();
    });
}
  
const fetchUdayProfile = async () => {
    console.log("Fetching..");
    const rawResponse = await fetch("https://api.github.com/users/ietuday");
    const jsonResponse = await rawResponse.json();
    console.log(jsonResponse);
    return jsonResponse;
  };
  
fetchWithAutoRetry(fetchUdayProfile, 5);
console.log(fetchApiWithAutoretry(externalApiCall, 3))