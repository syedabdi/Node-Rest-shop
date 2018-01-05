
const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');

const Mongoose = require('mongoose');

router.get('/',(req,res,next)=>{
  Order.find()
  .select('product quantity _id')
  .populate('product','price name')
  .exec()
  .then(docs =>{
      res.status(200).json({
          count:docs.length,
          orders:docs.map(doc =>{
              return {
              _id :doc._id,
              product:doc.product,
              quantity:doc.quantity,
              request:{
                type:'GET',
                url:'http://localhost:3000/orders/' + doc._id  
              }
              }
          })

      });
  })
  .catch(err=>{
      res.status(500).json({
          error:err
      })
  });
});


router.post('/',(req,res,next)=>{
    Product.findById(req.body.productId)
    .then(product =>{
        if (!product){
            return res.status(404).json({
                message:"Product not Found"
            });
        }
        const order = new Order ({
            _id:new Mongoose.Types.ObjectId(),
            quantity:req.body.quantity,
            product:req.body.productId
          });
         return order.save()
        })
          .then( result =>{
              console.log(result);
              res.status(201).json({
                  message:'Order stored',
                  createdOrder:{
                    _id: result._id,
                    product :result.productId,
                    quantity:result.quantity
                  },
                  request:{
                    type:'GET',
                    url:'http://localhost:3000/orders/' + result._id  
                  }
              });
          })
    .catch(err=>
    {
        res.status(500).json({
            error:err
        })
    });
});

 router.get('/:orderId',(req,res,next)=>{
    const id = req.params.orderId;
Order.findById(id)
.exec()
.then(order =>{
    if (!order){
        return res.status(404).json({
          message:"Order Not Found"
        });
    }
    res.status(200).json({
      order: order,
      request:{
          type:'GET',
          url:'http://localhost:3000/orders'
      }
    });
})
.catch(err=>{
    res.status(500).json({
        error:err
    });
 });
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
   const id = req.params.orderId;
   Order.remove({_id: id})
   .exec()
   .then(result=>{      
       res.status(200).json({
           message:"Order Deleted",
           request:{
               type:"POST",
               url:"http://localhost:3000/orders",
               body:{productId:'ID', quantity:'Number'}
           }
       });     
  })
  .catch(err=>{
      console.log(err);
      res.status(500).json({
          error:err
      });
    });
});


module.exports = router;
