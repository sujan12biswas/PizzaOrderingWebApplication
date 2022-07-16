const mongoose = require ('mongoose');
const Schema = mongoose.Schema; 

const orderSchema = new Schema ({        //prototype or blueprint
    customerId: { type: mongoose.Schema.Types.ObjectId, // Order connection er songe user connection er link kor6i
                  ref: 'User',
                  required: true
                },
    items: { type: Object, required: true},
    phone: { type: String, required: true},
    address: { type: String, required: true},
    paymentType: { type: String, default: 'COD'},
    status: { type: String, default: 'order_placed'}
                
    
},{timestamps: true});

//creating model

module.exports = mongoose.model('Order',orderSchema);

