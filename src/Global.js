const Constants = {
    token: "",
    mapInitialCoordinate: {
        longitude: 117.54623550877854,
        latitude: -2.2443379908591079,
        zoom: 3.5,
        maxZoom: 16,
        pitch: 0,
        bearing: 0
    },
    colors: ["#f10096", "#ff8f00", "#ffe600", "#37ff00", "#1e88e5", "#063e99", "#610699", "#99066f", "#99066f", " #990b06", "#06993c"],
    dummyMarketplace: [
        "TOKOPEDIA",
        "SHOPEE",
        "BLIBLI",
        "LAZADA",
    ],
    
    formatNumber: (number, comma = false, currency = "") => {
        if (currency) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: currency,
                maximumFractionDigits: comma? 2 : 0
            }).format(number);
        } else {
            return new Intl.NumberFormat('id-ID', {
                maximumFractionDigits: comma? 2 : 0
            }).format(number);
        }
    },
    sumData: (data, dataSummed) => {
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
            sum += data[i][dataSummed];
            console.log("sum data: ", data[i][dataSummed])
        }
        return sum
    },

    getProvinces: async(setProvinces) => {
        fetch("https://alamat.thecloudalert.com/api/provinsi/get/", {
            method: "GET"
        }).then(async (res) => {
            res.json().then(async (result) => {
                console.log(result.result)
                setProvinces(result.result)
            })
        })
    },
    getCities: async(provinceId, setCities) => {
        fetch("https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=" + provinceId, {
            method: "GET"
        }).then(async (res) => { 
            res.json().then(async (result) => {
                console.log(result.result)
                setCities(result.result);
            })
        })
    },
    getKecamatan: async(cityId) => {
        fetch("https://alamat.thecloudalert.com/api/kecamatan/get/?d_kabkota_id=" + cityId, {
            method: "GET"
        }).then(async (res) => {
            res.json().then(async (result) => {
                console.log(result.result)
                return result.result;
            })
        })
    },
    getCities: async(kecamatanId) => {
        fetch("https://alamat.thecloudalert.com/api/kelurahan/get/?d_kecamatan_id=" + kecamatanId, {
            method: "GET"
        }).then(async (res) => {
            res.json().then(async (result) => {
                console.log(result.result)
                return result.result;
            })
        })
    },
    mapToObject: (map) => Object.fromEntries(map.entries()),
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        
        console.log("shown: ",
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth))
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

export default Constants;