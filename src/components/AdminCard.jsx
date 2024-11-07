function AdminCard({adminDetails}) {

    return (
      <div className="text-center cursor-pointer border-2 border-primary-500 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:border-primary-400 hover:shadow-lg pt-3 pb-5">
          <div className="font-heading text-xl">
            {adminDetails?.name}
          </div>
          <div>
            {adminDetails?.phone_number}
          </div>
      </div>
    )
}

  export default AdminCard;
