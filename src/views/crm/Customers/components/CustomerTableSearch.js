import React, { forwardRef, useEffect, useState } from 'react'
import { Input } from 'components/ui'
import { HiOutlineSearch } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterData } from '../store/dataSlice'

const CustomerTableSearch = forwardRef((props, ref) => {

  const dispatch = useDispatch()

  const data = useSelector((state) => state.crmCustomers.data.customerList)

  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState(data); // Store filtered data locally

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    const filtered = data.filter(item =>
      item?.firstname.toLowerCase().includes(value.toLowerCase()) ||
      item?.lastname.toLowerCase().includes(value.toLowerCase()) || 
      item?.idCard.toLowerCase().includes(value.toLowerCase()) ||
      item?.mobile.toLowerCase().includes(value.toLowerCase()) 
    );

    setFilteredData(filtered); // Update the filtered data locally
  };

  useEffect(() => {
    dispatch(setFilterData(filteredData)); // Update the Redux store with filtered data
  }, [dispatch, filteredData]);

  return (
    <Input
      ref={ref}
      className="max-w-md md:w-52 mb-4"
      placeholder="შეიყვანეთ სახელი"
      prefix={<HiOutlineSearch className="text-lg" />}
      onChange={(e) => handleSearch(e)}
      value={searchValue}
    />
  )
})

export default CustomerTableSearch
