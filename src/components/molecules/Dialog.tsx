import * as React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide, 
    IconButton,
    Tooltip,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Divider
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '@/context/CartContext';

import { TransitionProps } from '@mui/material/transitions';

type TransitionPropsWithChildren = TransitionProps & {
    children?: React.ReactNode
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<any | undefined>,
) {
  return <Slide direction="up" ref={ref} {...props}>{props.children || <></>}</Slide>;
});



export default function AlertDialogSlide() {
    const { cart, removeFromCart } = useCart();
    const [open, setOpen] = React.useState(false);
    const handleCardLength = () => { 
    if (cart.length > 0) {
      return cart.length
    }
    return null
    }

    const countRepeatedItems = (id: number) => { 
        let count = 0
        cart.forEach((item) => { 
            if (item.id === id) {
                count++
            }
        })
        return count
    }

    const uniqueCart = cart.filter((item, index, self) => { 
        return index === self.findIndex((t) => (t.id === item.id))
    }
    )
    
    const truncateTitle = (title: string) => { 
        if (title.length > 25) {
            return title.slice(0, 24) + '...'
        }
        return title
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleClickOpen}
            >
                <Tooltip title="Shopping Cart">
                    <>
                        <ShoppingCartIcon />
                        {
                            cart.length > 0 && (
                            <Box 
                            sx={{
                                position: 'absolute',
                                top: '0',
                                right: '0',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                color: 'white',
                                backgroundColor: 'secondary.main',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            >
                            {handleCardLength()}
                            </Box>
                        )
                     }
                    </>
                </Tooltip>
            </IconButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Cart"}</DialogTitle>
                <Divider />
                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem'
                    }}
                >
                    {
                        cart.length > 0 ? (
                            uniqueCart.map((item) => (
                                <Card sx={{ maxWidth: 345, display:'flex' }} key={item.id}>
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        width="100"
                                        image={item.image}
                                        alt={item.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="subtitle2" component="div">
                                            {truncateTitle(item.title)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ${item.price} x {countRepeatedItems(item.id)}
                                            <span style={{
                                                color: 'black',
                                                fontSize: 'bold'
                                            }}>
                                                ${parseInt(item.price) * countRepeatedItems(item.id)}
                                            </span>
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            edge="start"
                                            color="inherit"
                                            aria-label="menu"
                                            sx={{ mr: 2 }}
                                            onClick={() => removeFromCart(item)}
                                        >
                                            <Tooltip title="Delete">
                                                <DeleteIcon />
                                            </Tooltip>
                                        </IconButton>

                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <DialogContentText id="alert-dialog-slide-description">
                                Your cart is empty
                                </DialogContentText>
                            )
                        

                    }
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        sx={{
                            backgroundColor: 'secondary.main',
                            width: '100%',
                            height: '50px',
                        }}
                    >
                        Checkout
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}