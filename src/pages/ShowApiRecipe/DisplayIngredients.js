import { Paper, Box, Button } from '@mui/material';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';


const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));


const DisplayIngredients = ({ ingredients}) => {
    const [open, setOpen] = React.useState(false);
    const [current, setCurrent] = React.useState("");
    const [current2, setCurrent2] = React.useState([]);

    const handleClickOpen = async (ingredient) => {
        const ans = await axios.get(`https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=${ingredient}&apiKey=${process.env.REACT_APP_API_KEY3}`)
        if (ans.data.status == "success") {
            setCurrent(ans.data.ingredient)
            setCurrent2(ans.data.substitutes)
            setOpen(true);
        }
        else {
            setCurrent(ans.data.message)
            setCurrent2([])
            setOpen(true);
        }

    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Typography variant='h4' >Ingredients:</Typography>
            <Box sx={{
                textAlign: 'left',
                boxShadow: 1,
                borderRadius: 2,
                backgroundColor:"#E5D3D3",
                maxWidth: 1200,
                margin: 5,
                padding: 7
            }}>

                {ingredients?.map(ingredient => (
                    <div>
                        - &nbsp;
                        <Typography component="span" align="left">{`${ingredient.qty} ${ingredient.measuringUtensilName} ${ingredient.meta}`}</Typography>
                        <LightTooltip sx={{}}
                            title={
                                <div>
                                    <div><img src={ingredient.ingredientImg} /></div>
                                    <Button size="small" variant="text" onClick={() => { handleClickOpen(ingredient.ingredientName) }}><em>dont have?</em></Button>
                                </div>
                            }
                        >
                            <Typography component="span" align="left">{` ${ingredient.ingredientName}`}</Typography>
                        </LightTooltip >
                    </div>
                ))}

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle>{current}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {current2}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </Box>
        </>)
}
export default DisplayIngredients