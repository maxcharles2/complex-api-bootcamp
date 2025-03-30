//CoinGecko API docs: https://docs.coingecko.com/v3.0.1/reference/simple-price
//ExchangeRate-API docs: https://www.exchangerate-api.com/docs/standard-requests

const getUsdBtn = document.querySelector('#getUsdBtn');
const getEurBtn = document.querySelector('#getEurBtn');

getUsdBtn.addEventListener('click', getUsd);
getEurBtn.addEventListener('click', getEur);

function getUsd(){
    let btcPrice = document.querySelector('#btcPrice');
    let btcMarketCap = document.querySelector('#btcMarketCap');
    let btc24hVolume = document.querySelector('#btc24hVolume');

    let url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`;

    fetch(url)
        .then(res => {
            if(!res.ok){
                throw Error('There is an error in returning the response');
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            btcPrice.innerText = `BTC price: ${data.bitcoin.usd}`;
            btcMarketCap.innerText = `Market Cap BTC: ${data.bitcoin.usd_market_cap}`;
            btc24hVolume.innerText = `BTC 24H Volume: ${data.bitcoin.usd_24h_vol}`;
        })
        .catch(err => {
            console.log(err);
        })
}

function getEur(){
    let eurRate = document.querySelector('#eurRate');
    let btcPriceEur = document.querySelector('#btcPriceEur');
    let btcMarketCapEur = document.querySelector('#btcMarketCapEur');
    let btc24hVolumeEur = document.querySelector('#btc24hVolumeEur');

    let cgUrl = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`;

    let erApiKey = '6cd48169739089011681eec1';
    let erUrl = `https://v6.exchangerate-api.com/v6/${erApiKey}/latest/USD`;

    fetch(cgUrl)
        .then(cgRes => {
            if(!cgRes.ok){
                throw Error('There is an error in returning the response from the CoinGecko API');
            }
            return cgRes.json();
        })
        .then(cgData => {
            console.log(cgData);
            
            fetch(erUrl)
                .then(erRes => {
                    if(!erRes.ok){
                        throw Error('There is an error in returning the response from the ExchangeRate-API');
                    }
                    return erRes.json();
                })
                .then(erData => {
                    console.log(erData);
                    eurRate.innerText = `Current EUR rate: ${erData.conversion_rates.EUR}`;
                    btcPriceEur.innerText = `BTC price EUR: ${cgData.bitcoin.usd * erData.conversion_rates.EUR}`;
                    btcMarketCapEur.innerText = `Market Cap BTC in EUR: ${cgData.bitcoin.usd_market_cap * erData.conversion_rates.EUR}`;
                    btc24hVolumeEur.innerText = `BTC 24H Volume in EUR: ${cgData.bitcoin.usd_24h_vol * erData.conversion_rates.EUR}`;
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
}