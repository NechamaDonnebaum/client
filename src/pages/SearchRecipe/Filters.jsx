import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Stack, Paper, Autocomplete, TextField, Divider } from '@mui/material';
import { Input } from '@mui/material';
import SelectedFilter from './SelectedFilter';

function Filters({ where, setWhere }) {

  const [ingredients, setiIngredients] = useState([{ id: 1, name: "sugar" }, { id: 2, name: "chocolate" }, { id: 3, name: "water" }]);
  const [types, setTypes] = useState([{ id: 1, name: "drink" }, { id: 2, name: "super" }, { id: 3, name: "brakfast" }]);
  const [diets, setDiets] = useState([{ id: 1, name: "gluten-free" }, { id: 2, name: "daire-free" }, { id: 3, name: "diet" }]);

  useEffect(() => {

    async function fetchData() {
      let config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") } }

      const { data: _ingredients } = await axios.get("http://localhost:3600/api/ingredient", config)
      if (_ingredients?.length) setiIngredients(_ingredients)

      const { data: _categories } = await axios.get("http://localhost:3600/api/category", config)
      if (_categories?.length) setTypes(_categories)

      const { data: _tags } = await axios.get("http://localhost:3600/api/tag", config)
      if (_categories?.length) setDiets(_tags)

    }
    fetchData()
  }, [])


  return (
    <Paper elevation={16}
      sx={{
        marginRight: 'auto',
        marginLeft: 'auto',
        textAlign: 'center',
        boxShadow: 1,
        borderRadius: 2,
        backgroundColor: 'pink',
        width: "90%",
        margin: 5,
        padding: 2
      }}>
      <h1>filter</h1>
      <div>
        <Input value={where.name} placeholder="something yummy is coming..." variant="outlined" sx={{ margin: 5, width: "50%" }}
          onChange={event => setWhere({ ...where, name: event.target.value })}
        />
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} >
          <Autocomplete
            color="#ff0000"
            multiple
            limitTags={0}
            options={ingredients}
            getOptionLabel={(option) => option.name}
            value={where.includeIngredients}
            renderInput={(params) => (
              <TextField {...params} label="includeIngredients" placeholder="includeIngredients" />
            )}
            InputProps={{
              style: {
                color: "#ff0000"
              }
            }}
            sx={{ width: '350px', borderColor: "#ff0000" }}
            onChange={(event, values) => { setWhere({ ...where, includeIngredients: values }) }}
          />
          <Autocomplete
            multiple
            limitTags={0}
            options={ingredients}
            getOptionLabel={(option) => option.name}
            value={where.excludeIngredients}
            renderInput={(params) => (
              <TextField {...params} label="exclude Ingredients" placeholder="exclude Ingredients" />
            )}
            sx={{ width: '350px' }}
            onChange={(event, values) => { setWhere({ ...where, excludeIngredients: values }) }}

          />
          <Autocomplete
            multiple
            limitTags={0}
            defaultValue={where.selectedDiets}
            options={diets}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="diets" placeholder="diets" />
            )}
            onChange={(event, values) => { setWhere({ ...where, selectedDiets: values }) }}
            sx={{ width: '350px' }}
          />
          <Autocomplete
            multiple
            limitTags={0}
            options={types}
            getOptionLabel={(option) => option.name}
            value={where.selectedTypes}
            renderInput={(params) => (
              <TextField {...params} label="types" placeholder="types" />
            )}
            sx={{ width: '250px' }}
            onChange={(event, values) => { setWhere({ ...where, selectedTypes: values }) }}

          />
          <Autocomplete
            limitTags={1}
            options={["15", "30", "45", "60"]}
            getOptionLabel={(option) => option}
            value={where.maxReadyTime}
            renderInput={(params) => (
              <TextField {...params} label="Cook and Prep. Time" placeholder="Cook and Prep. Time" />
            )}
            sx={{ width: '350px' }}
            onChange={(event, value) => { debugger; setWhere({ ...where, maxReadyTime: value }) }}
          />
        </Stack>
        {(where.includeIngredients?.length != 0 || where.excludeIngredients?.length != 0 || where.selectedTypes?.length != 0 || where.selectedDiets?.length != 0) && <Divider variant="middle" sx={{ margin: 2 }} />}
        <div style={{ flexWrap: "wrap", justifyContent: "flex-start", display: "flex" }}> {where.includeIngredients?.length != 0 &&
          <SelectedFilter name="includeIngredients" where={where} setWhere={setWhere}></SelectedFilter>}
          {where.excludeIngredients?.length != 0 &&
            <SelectedFilter name="excludeIngredients" where={where} setWhere={setWhere}></SelectedFilter>}
          {where.selectedDiets?.length != 0 &&
            <SelectedFilter name="selectedDiets" where={where} setWhere={setWhere}></SelectedFilter>}
          {where.selectedTypes?.length != 0 &&
            <SelectedFilter name="selectedTypes" where={where} setWhere={setWhere}></SelectedFilter>}
        </div> </div>
      <button onClick={() => { debugger }}>debugger</button>

    </Paper>
  )
}
export default Filters