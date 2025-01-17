import React, { useState, useEffect } from 'react';
import { Box, Pagination, Paper } from '@mui/material';
import axios from "axios"
import RecipesGrid from './RecipesGrid';
import Filters from './Filters';
import { useLocation, } from 'react-router-dom';


const SearchRecipe = ({ src }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [recipes, setRecipes] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [totalPages, setTotalPagegs] = useState(1);
    const startIndex = (page - 1) * itemsPerPage;
    const [where, setWhere] = useState({
        name: null,
        selectedDiets: [],
        selectedTypes: [],
        includeIngredients: [],
        excludeIngredients: [],
        maxReadyTime: null
    });

    const generateSpoonacularUrl = () => {
        let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY3}&`
        url += `number=${itemsPerPage}&offset=${startIndex}&`
        if (where.name)
            url += `query=${where.name}&`
        if (where.maxReadyTime)
            url += `maxReadyTime=${where.maxReadyTime}&`
        if (where.excludeIngredients.length > 0)
            url += `excludeIngredients=${where.excludeIngredients.map(o => o.name).join(',')}&`
        if (where.includeIngredients.length > 0)
            url += `includeIngredients=${where.includeIngredients.map(o => o.name).join(',')}&`
        if (where.selectedDiets.length > 0)
            url += `diet=${where.selectedDiets.map(o => o.name).join(',')}&`
        if (where.selectedTypes.length > 0)
            url += `type=${where.selectedTypes.map(o => o.name).join(',')}&`
        return url;
    }

    const generateApiUrl = () => {
        let url = `http://localhost:3600/api/recipe/`
        // const { data: recipeToEdit } = await axios.get(`http://localhost:3600/api/recipe/${recipeId}`)
        return url;
    }

    useEffect(() => {
        async function fetchData() {
            let url;
            if (src=="spoonacular")
                 url = generateSpoonacularUrl()
            else
                 url = generateApiUrl()
            const ans = await axios.get(url)
            if (src=="spoonacular"){
                setRecipes(ans.data.results)
                setTotalPagegs(Math.ceil(ans.data.totalResults / itemsPerPage));
                // setPage(1);
            }
            else{
                setRecipes(ans.data)
            }
        }
        fetchData()
    }, [where, page, itemsPerPage, refresh,src]);

    useEffect(() => {
        setWhere({ ...where, name:queryParams.get("name")})
    }, []);

    return (
        <>
            <Filters where={where} setWhere={setWhere} />
            <button onClick={()=>{console.log(recipes);debugger}}>debbuger</button>
            <RecipesGrid src={src} recipes={recipes} setRefresh={setRefresh} />
            <Pagination count={totalPages} page={page} onChange={(event, page) => { setPage(page) }} />
        </>
    )
}

export default SearchRecipe


