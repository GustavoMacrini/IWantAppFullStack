import { useEffect, useState } from "react";
import ProductsGrid from "../../Components/ProductsGrid";
import axios from 'axios';

function ProductShowcase() {
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
            <h1>Vitrine de Produtos</h1>
            {/*<ul>*/}
            {/*    {produtos.length > 0 ? produtos.map((produto) => (*/}
            {/*        <li key={produto.id}>*/}
            {/*            { produto.name}*/}
            {/*        </li>*/}
            {/*    )) : <h1>tem nada</h1>}*/}
            {/*</ul>*/}
            <ProductsGrid data={produtos} />
        </div>
    );
}

export default ProductShowcase;
