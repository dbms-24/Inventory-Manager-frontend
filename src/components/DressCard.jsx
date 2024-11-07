import EditIcon from '@mui/icons-material/Edit';

function DressCard({ dressData, setDressOpen, setDressModalId, setDressEditOpen, setDressEditInitialValue }) {

  function handleOnclick() {
    setDressOpen(true);
    setDressModalId(dressData?.id);
  }
  function handleEditDressTemplate() {
    setDressEditInitialValue(dressData);
    setDressEditOpen(true)
  }
  return (
    <div className='relative'>
      <div className='flex justify-end mr-3 absolute right-0 top-2 z-10 transition-all duration-300 ease-in-out hover:scale-125 hover:border-primary-400 hover:shadow-lg' onClick={handleEditDressTemplate}>
        <EditIcon className='text-xl text-yellow-500 font-bold' />
      </div>
      <div className="text-center cursor-pointer border-2 border-primary-500 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:border-primary-400 hover:shadow-lg pt-3 pb-5" onClick={handleOnclick}>
        <div className="font-heading text-xl">
          {dressData.name}
        </div>
        <div>
          {dressData.brand}
        </div>
        <div>
          Still Needed:{dressData.required_quantity}
        </div>
      </div>
    </div>
  )
}

export default DressCard;
