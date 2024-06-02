import { useState, useEffect} from "react";
import AddProductCard from "../AddProductCard/index";
import ProductCard from "../ProductCard";

function ProductsGrid(prop) {
    const [products, setProducts] = useState(prop.data);

    const handleRemove = (id) => {
        let newProducts = products.filter(product => product.id != id);
        setProducts(newProducts);
        console.log(id);
    }

    useEffect(() => {
        if (products) {
            setProducts(prop.data);
        }
    }, [prop.data]);

    return (
        <div className="d-flex flex-wrap gap-3">
            {(prop.edit) ? 
                <AddProductCard/>
                : ""} 
            {products.map(item => 
                <ProductCard
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    edit={prop.edit}
                    id={item.id}
                    onRemove={handleRemove}
                />
            )}            
        </div>
    )
}

export default ProductsGrid;