const FetchData=async({route,method,body})=>{
    const response = await fetch(route, {
        method: method,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
}
export default FetchData