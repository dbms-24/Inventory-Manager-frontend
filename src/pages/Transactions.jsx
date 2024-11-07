import { useState } from "react";
import AddCustomerTransaction from '../components/AddCustomerTransaction.jsx';
import CustomersTransactionDetails from "../components/CustomersTransactionDetails"
import SuppliersTransactionDetails from "../components/SuppliersTransactionDetails"

function Transactions() {
    const [customerAddOpen, setCustomerAddOpen] = useState(false);
    return (
      <div className="min-h-screen">
      <AddCustomerTransaction customerAddOpen={customerAddOpen} setCustomerAddOpen={setCustomerAddOpen}/>
        
        <div className={"flex justify-between px-10"}>
          <div className="flex flex-col justify-center font-heading text-2xl font-bold my-4">
            <div>
            Customer Transactions
          </div>
          </div>
        <div className="bg-primary-400 font-normal rounded-lg my-4 px-3 py-2 cursor-pointer" onClick={()=>setCustomerAddOpen(true)}>Add Customer Transaction</div>
        </div>
        <CustomersTransactionDetails />

        <div className="mt-6"></div>

        <div className={"flex justify-between px-10"}>
          <div className="flex flex-col justify-center font-heading text-2xl font-bold my-4">
            <div>
            Supplier Transactions
          </div>
          </div>
        <div className="bg-primary-400 font-normal rounded-lg my-4 px-3 py-2 cursor-pointer" onClick={()=>setCustomerAddOpen(true)}>Add Supplier Transaction</div>
        </div>
        <SuppliersTransactionDetails />
        </div>
      
    )
  }
  
  export default Transactions;
