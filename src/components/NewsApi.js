import React from 'react'
import axios from 'axios'
import Pagination from 'react-paginate'
import Card from './Card'
function NewsApi() {
    const [catagory,setCatagory]=React.useState("sports")
    const [Data,setData]=React.useState([])
    const per_page=5
    const [pageNumber,setPageNumber]=React.useState(0)
    const pageCount=Math.ceil(25/per_page)
    const [isLoading,setLoading]=React.useState(true)
    const [isError,setErroe]=React.useState(true)


    React.useEffect(()=>{
        getData()
    },[pageNumber,catagory])



    // Selecting Catagory
    const changeHandle=(e)=>{
        setCatagory(e.target.value)
    }

    // getting Data

    const getData=()=>{
        axios.get("http://api.mediastack.com/v1/news",{
            params:{
                access_key:"f7d7189bcc001d3fd48c125737b3e687",
                categories:catagory,
                languages:"en",
                limit:per_page,
                offset:(pageNumber*per_page)+1
            }
        })
        .then(res=>setData(res.data.data))
        .catch(error=>console.log(error))
        .finally(()=>{
            setLoading(false)
            setErroe(false)
        })
    }


    // changing page


    const pageChange=({selected})=>{
        // console.log(selected)
        setPageNumber(selected)
    }
    console.log(catagory)



    return (
        <div>
            <div>{isLoading&& <p>PLEASE WAIT IT LOADING...........</p>}</div>
            <div>{isError&& <p>SOMTHING WENT WRONG PLEASE WAIT...........</p>}</div>

            {/* Selecting Catagory */}
            <select value={catagory} className={"select"} onChange={changeHandle}>
                <option>----select---</option>
                {["sports","business"].map(item=><option value={item}>{item}</option>)}
            </select>


            {/* Data Fetchingg */}
            {Data.map((item)=><Card data={item}/>)}



            {/* Pagination Part */}
            {!isLoading&&<Pagination
                previousLabel={"<<<"}
                nextLabel={">>>"}
                pageCount={pageCount}
                onPageChange={pageChange}
                containerClassName={"paginationbtn"}
                nextLinkClassName={"nextbtn"}
                previousLinkClassName={"prevbtn"}
                activeClassName={"paginationActive"}
            />}
        </div>
    )
}

export default NewsApi
