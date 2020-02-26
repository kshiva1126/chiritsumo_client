import axiosbase from 'axios'

export const axios = axiosbase.create({
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': 'https://kshiva1126.com/chiritsumo/server'
  }
})
