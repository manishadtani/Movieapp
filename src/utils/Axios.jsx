import axios from 'axios'


const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGEzMDU5NmRmMDk5MDRlY2U4NWRjNDM0NDM4YjZhZSIsIm5iZiI6MTczNzE5ODMwNC43NDMsInN1YiI6IjY3OGI4YWUwYWZjYjMyYzQ5OTQyZmE1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fjrI7txH1y9EmoytsS9_Kg4rzVvByqd4lBReC9h1LQA'
      }})


export default instance