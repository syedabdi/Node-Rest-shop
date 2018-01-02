const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
   res.status(200).json({
       message: 'Handling Get Reuest for Orders'
   })
});

router.post('/',(req,res,next)=>{
    res.status(201).json({
        message: 'Handling post Reuest'
    })
 });

 router.get('/:orderId',(req,res,next)=>{
    const id = req.params.orderId;
    if(id==='special'){
        res.status(200).json({
            message:'special',
            id:id
        })
    }
    else{
       res.status(200).json({
           message:'special'
       }) 
    }
});

router.patch('/:orderId',(req,res,next)=>{
   const id = req.params.productId;
   if(id==='special'){
       res.status(200).json({
           message:'update',
           id:id
       })
   }
   else{
      res.status(200).json({
          message:'update'
      }) 
   }
});

router.delete('/:orderId',(req,res,next)=>{
   const id = req.params.productId;
   if(id==='special'){
       res.status(200).json({
           message:'delete',
           id:id
       })
   }
   else{
      res.status(200).json({
          message:'delete'
      }) 
   }
});


module.exports = router;
