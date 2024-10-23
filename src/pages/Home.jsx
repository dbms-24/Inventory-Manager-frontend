import { Link } from "react-router-dom"

function Home() {

    return (
      <div className="flex justify-center h-screen">
      <div className="flex flex-col justify-around text-center" data-aos="zoom-in">
        <Link to={"/employees"} className="border-2 transition-all duration-300 ease-in-out hover:scale-110 hover:border-primary-400 hover:shadow-lg border-primary-500 cursor-pointer px-28 text-xl font-normal py-5 rounded-lg" >
          Employees
        </Link>
        <Link to={"/customers"} className="border-2 transition-all duration-300 ease-in-out hover:scale-110 hover:border-primary-400 hover:shadow-lg border-primary-500 cursor-pointer px-28 text-xl font-normal py-5 rounded-lg">
          Customers
        </Link>
        <Link to={"/dresses"} className="border-2 transition-all duration-300 ease-in-out hover:scale-110 hover:border-primary-400 hover:shadow-lg border-primary-500 cursor-pointer px-28 text-xl font-normal py-5 rounded-lg">
          Dresses
        </Link>
        <Link to={"/suppliers"} className="border-2 transition-all duration-300 ease-in-out hover:scale-110 hover:border-primary-400 hover:shadow-lg border-primary-500 cursor-pointer px-28 text-xl font-normal py-5 rounded-lg" >
          Suppliers
        </Link>
        <Link to={"/stock"} className="border-2 transition-all duration-300 ease-in-out hover:scale-110 hover:border-primary-400 hover:shadow-lg border-primary-500 cursor-pointer px-28 text-xl font-normal py-5 rounded-lg">
          Stock
        </Link>
        <Link to={"/transactions"} className="border-2 transition-all duration-300 ease-in-out hover:scale-110 hover:border-primary-400 hover:shadow-lg border-primary-500 cursor-pointer px-28 text-xl font-normal py-5 rounded-lg">
          Transactions
        </Link>
      </div>
      </div>
    )
  }
  
  export default Home
