import React, { useEffect, useState } from 'react'
import ProductCard from './card/ProductCard'
import axios from 'axios';
import CategoryCard from './card/CategoryCard';
import NotFoundText from './NotFoundText';


const CategoryGrid = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`)
            .then((res) => {
                setCategories(res.data.categories)
            }).catch((error) => {
                console.log(error)
            })
    }, []);

    if (!categories) {
        return <NotFoundText>Category Not Found </NotFoundText>
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2  gap-3'>
            {categories !== null &&
                categories.map((category) => (
                    <CategoryCard category={category} key={category.id} />
                ))
            }
        </div>
    )
}

export default CategoryGrid 
