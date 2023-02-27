import React, { createContext, useState, useMemo } from 'react';
import { getProductsByCategory } from '@/data/api';

type FilteredProductsContextType = {
    filteredProducts: Product[];
    setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    currentCategory: string;
    setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    searchProduct: string;
    setSearchProduct: React.Dispatch<React.SetStateAction<string>>;
}


const filteredProductsContextDefaultValues: FilteredProductsContextType = {
    filteredProducts: [],
    setFilteredProducts: () => { },
    currentCategory: 'all',
    setCurrentCategory: () => { },
    loading: false,
    setLoading: () => { },
    searchProduct: '',
    setSearchProduct: () => { }
}

const FilteredProductsContext = createContext<FilteredProductsContextType>(filteredProductsContextDefaultValues);

export function useFilteredProducts() {
    return React.useContext(FilteredProductsContext);
}

export function FilteredProductsProvider({ children }: { children: React.ReactNode }) {
    const [searchProduct, setSearchProduct] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [currentCategory, setCurrentCategory] = React.useState('all');
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        if (currentCategory === 'all') {
            setFilteredProducts([]);
            setLoading(false);
        } else {
            getProductsByCategory(currentCategory)
            .then((products) => {
                setFilteredProducts(products);
                setLoading(false);
            });
        }
    }, [currentCategory]);

    


    const values = useMemo(() => ({
        filteredProducts,
        setFilteredProducts,
        currentCategory,
        setCurrentCategory,
        loading,
        setLoading,
        searchProduct,
        setSearchProduct
    }), [filteredProducts,
        setFilteredProducts,
        currentCategory,
        setCurrentCategory,
        loading,
        setLoading,
        searchProduct,
        setSearchProduct
    ]);

    return (
        <FilteredProductsContext.Provider value={ values }>
            {children}
        </FilteredProductsContext.Provider>
    );
}