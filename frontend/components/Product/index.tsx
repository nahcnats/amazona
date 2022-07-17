import React from 'react';
import {
    Button,
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography
} from '@mui/material';
import { AddShoppingCart as AddShoppingCartIcon } from '@mui/icons-material';

import data from '../../dummyData/data';

function Products() {
    return (
        <Box>
            <Typography variant="h5" my={3} sx={{ fontWeight: 'bold' }}>Products</Typography>
            <Grid container spacing={3}>
                {
                    data.products.map(product => (
                        <Grid item key={product.slug} md={4}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia component="img" image={product.image} title={product.name}></CardMedia>
                                    <CardContent>
                                        <Typography>{ product.name }</Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions sx={{ justifyContent: 'space-between' }}>
                                    <Typography>RM {product.price}</Typography> 
                                    <Button
                                        size="small"
                                        color="secondary"
                                        variant="contained"
                                        startIcon={<AddShoppingCartIcon />}
                                        disableElevation
                                    >
                                        Add to cart
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }                
            </Grid>
        </Box>
    );
}

export default Products; 
