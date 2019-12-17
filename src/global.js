module.exports = {
    MoneyStand : (money)=>{
       return (money).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString().split('.')[0];
    },
    baseUrl :'http://192.168.0.135:3000'
};