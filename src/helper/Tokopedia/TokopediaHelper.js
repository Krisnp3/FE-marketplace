import DummyDatas from "../../Dummies";
import Geographic from "./Geographic/Geographic";
import Overview from "./Overview/Overview";
import Product from "./Product/Product";
import Sales from "./Sales/Sales";

const Tokopedia = {
    labels: ["Overview", "Sales", "Product & Promo", "Geographic"],
    getData: (data, onScroll, curPage) => {
        console.log("onscroll2,", onScroll)
        let overviewData = {
            "Transactions": DummyDatas.Overview.Transactions,
            "Revenue": DummyDatas.Overview.Revenue,
            "OrderStatus": DummyDatas.Overview.OrderStatus,
            "PromoType": DummyDatas.Overview.PromoType,
            "ShippingExpedition": DummyDatas.Overview.ShippingExpedition,

            "BuyerOverview": DummyDatas.Overview.BuyerOverview,
            "OrderDistribution": DummyDatas.Overview.OrderDistribution,
            "ProductPerformance": DummyDatas.Overview.ProductPerformance,
            "PromoPerformance": DummyDatas.Overview.PromoPerformance,
        }

        let salesData = {
            "Transactions": DummyDatas.Sales.Transactions,
            "Revenue": DummyDatas.Sales.Revenue,
            "OrderStatus": DummyDatas.Overview.OrderStatus,
            "OrdersByDay": DummyDatas.Sales.OrdersByDay,
            "OrdersByHour": DummyDatas.Sales.OrdersByHour,
            "OrdersByDayOfMonth": DummyDatas.Sales.OrdersByDayOfMonth
        }

        let productData = {
            "ProductPerformance": DummyDatas.Product.ProductPerformance,
            "ProductProportion": DummyDatas.Product.ProductProportion,
            "PriceQuantityRelation": DummyDatas.Product.PriceQuantityRelation,
            "PromoProportion": DummyDatas.Product.PromoProportion,
            "PromoTypeProportion": DummyDatas.Product.PromoTypeProportion,
            "PromoPerformance": DummyDatas.Product.PromoPerformance,
            "OrderDistribution": DummyDatas.Product.OrderDistribution,
        }

        let geographicData = {
            "CityCluster": DummyDatas.Geographic.cluster,
            "CityHeatMapRevenue": DummyDatas.Geographic.heatMapRevenue,
            "CityHeatMapQuantity": DummyDatas.Geographic.heatMapQuantity,
            "CityRevenue": DummyDatas.Geographic.RevenueCity,
            "CityQuantity": DummyDatas.Geographic.QuantityCity,
            "CityProductPerformance": DummyDatas.Geographic.ProductPerformance,

            "KecamatanCluster": DummyDatas.Geographic.cluster,
            "KecamatanHeatMapRevenue": DummyDatas.Geographic.heatMapRevenue,
            "KecamatanHeatMapQuantity": DummyDatas.Geographic.heatMapQuantity,
            "KecamatanRevenue": DummyDatas.Geographic.RevenueCity,
            "KecamatanQuantity": DummyDatas.Geographic.QuantityCity,
            "KecamatanProductPerformance": DummyDatas.Geographic.ProductPerformance,

            "KelurahanCluster": DummyDatas.Geographic.cluster,
            "KelurahanHeatMapRevenue": DummyDatas.Geographic.heatMapRevenue,
            "KelurahanHeatMapQuantity": DummyDatas.Geographic.heatMapQuantity,
            "KelurahanRevenue": DummyDatas.Geographic.RevenueCity,
            "KelurahanQuantity": DummyDatas.Geographic.QuantityCity,
            "KelurahanProductPerformance": DummyDatas.Geographic.ProductPerformance,

            "JabodetabekRevenueComparison": DummyDatas.Geographic.JabodetabekRevenueComparison,
            "ComparisonTotal": DummyDatas.Geographic.ComparisonTotal,
            "ShippingExpedition": DummyDatas.Geographic.ShippingExpedition,
            "ShippingExpeditionDestination": DummyDatas.Geographic.ShippingExpeditionDestination,
        }

        return [<Overview onScroll={onScroll} data={overviewData}/>, <Sales onScroll={onScroll} data={salesData}/>, <Product onScroll={onScroll} data={productData}/>, <Geographic data={geographicData} onScroll={onScroll} curPage={curPage}/>];
    }
};

export default Tokopedia;