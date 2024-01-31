import mapStyle from "./MapStyle";

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
    colors: ["#FF8080", "#a9ff96", "#B4E4FF", "#95BDFF", "#FFCF96", "#F6FDC3", "#A1EEBD", "#99066f", " #990b06", "#06993c"],
    // colors: ["#34a853", "#fbbc05", "#ea4335","#34a853", "#fbbc05", "#ea4335","#34a853", "#fbbc05", "#ea4335","#34a853", "#fbbc05", "#ea4335", "#95BDFF", "#F7C8E0", "#FFCF96", "#F6FDC3", "#A1EEBD", "#99066f", "#06993c", "#FF8080",],
    // colors: ["#34a853", "#fbbc05", "#ea4335","#467fe0", "#34a853", "#fbbc05", "#ea4335","#467fe0", "#34a853", "#fbbc05", "#ea4335","#467fe0", ],
    // colors: ["#01ebff", "#049fff", "#ff8c00","#ff7701","#01ebff", "#049fff", "#ff8c00","#ff7701","#01ebff", "#049fff", "#ff8c00","#ff7701",],
    colorHorBarChart: ["#34a853", "#fbbc05", "#ea4335","#0452d9",],
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
        }
        return sum
    },

    getProvinces: async(setProvinces) => {
        fetch("https://alamat.thecloudalert.com/api/provinsi/get/", {
            method: "GET"
        }).then(async (res) => {
            res.json().then(async (result) => {
                setProvinces(result.result)
            })
        })
    },
    getCities: async(provinceId, setCities) => {
        fetch("https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=" + provinceId, {
            method: "GET"
        }).then(async (res) => { 
            res.json().then(async (result) => {
                setCities(result.result);
            })
        })
    },
    getKecamatan: async(cityId) => {
        fetch("https://alamat.thecloudalert.com/api/kecamatan/get/?d_kabkota_id=" + cityId, {
            method: "GET"
        }).then(async (res) => {
            res.json().then(async (result) => {
                return result.result;
            })
        })
    },
    getCities: async(kecamatanId) => {
        fetch("https://alamat.thecloudalert.com/api/kelurahan/get/?d_kecamatan_id=" + kecamatanId, {
            method: "GET"
        }).then(async (res) => {
            res.json().then(async (result) => {
                return result.result;
            })
        })
    },
    mapToObject: (map) => Object.fromEntries(map.entries()),
    

    mapStyle: mapStyle,
};

export default Constants;