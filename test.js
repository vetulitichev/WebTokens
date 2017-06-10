
// fetch('http://localhost:8080/signup',{
//     method: "POST",
//     body: JSON.stringify({id:'444',password:'444'})
// })
//     .then(function(res){ return res.json()})
//     .then((data)=>{console.log(data)})
//     .catch((res)=>{console.log(res)});

fetch('http://localhost:8080/info',{
    method: "GET"
    //body: JSON.stringify({id:'444',password:'444'})
})
    .then(function(res){ return res.json()})
    .then((data)=>{console.log(data)})
    .catch((res)=>{console.log(res)});

//"accessToken": ""eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InZldCIsInBhc3N3b3JkIjoiMTIzIiwiYWNjZXNzVG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJblpsZENJc0luQmhjM04zYjNKa0lqb2lNVEl6SWl3aWFXRjBJam94TkRrMk5qUTVOalV6TENKbGVIQWlPakUwT1RZMk5UQXlOVE45Lnk5aEdka29WeXhjMVdHLUJfYlJWWm5NX09KbmFzamRCWGZhTUZPLVBuUHMiLCJpYXQiOjE0OTY2NTIyNTUsImV4cCI6MTQ5NjY1Mjg1NX0.5qYSAB7m8T_vE9QTvcmCoA60Kpbq6eXkhz6pZ1O0aFQ"",
//"refreshToken": ""eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InZldCIsInBhc3N3b3JkIjoiMTIzIiwiYWNjZXNzVG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJblpsZENJc0luQmhjM04zYjNKa0lqb2lNVEl6SWl3aWFXRjBJam94TkRrMk5qUTVOalV6TENKbGVIQWlPakUwT1RZMk5UQXlOVE45Lnk5aEdka29WeXhjMVdHLUJfYlJWWm5NX09KbmFzamRCWGZhTUZPLVBuUHMiLCJpYXQiOjE0OTY2NTIyNTV9.f0bL7A8IwSRqR9GnSJrj2HG8pd37U1PDCJEQlZdPzpY"",