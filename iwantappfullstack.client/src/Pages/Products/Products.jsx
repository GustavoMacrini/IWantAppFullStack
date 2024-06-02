
import { useEffect, useState } from "react";
import ProductsGrid from "../../Components/ProductsGrid";
import axios from 'axios';


function Products() {
    const [produtos, setProdutos] = useState([]);

    const getProducts = async () => {
        try {
            const response = await axios.get("/api/products/showcase");
            setProdutos(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <h1>Produtos Anunciados</h1>
            <ProductsGrid data={produtos} edit={true} />
        </div>
    )
}

export default Products;
