import {useEffect,useState} from 'react'
import {
     collection,
     query,
    getDocs,
    where,
    orderBy,
    limit,
    startAfter,
 } from 'firebase/firestore'
    import { db } from '../firebase.config'
    import {toast} from 'react-toastify'
    import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'
function Offers() {
    const [listings,setListings] =useState (null)
    const [loading,setLoading] =useState(true)
    const [lastFetchListing,setLastFetchListing] =useState(null)
   

    useEffect(()=>{
        const fetchListings = async () =>{
           try {
            //get reference

            const listingRef=collection(db,'listings')

            //create a query
            const q=query(listingRef,
              where('offer' ,'==',true), orderBy('timestamp','desc'),
            limit(10)
            )
           //execute the query 
           const querySnap =await getDocs(q)
           const lastVisible =querySnap.docs[querySnap.docs.length-1]
           setLastFetchListing(lastVisible)
            const listings =[]

            querySnap.forEach((doc)=>{
                return listings.push({
                    id:doc.id,
                    data:doc.data()
                })
            })

            setListings(listings)
            setLoading(false)
           } catch (error) {
            toast.error('Could not fetch listings')
            
           } 
        }

        fetchListings()
    },[])


 //pagination / /load More

 const onFetchMoreListings = async () =>{
    try {
     //get reference

     const listingRef=collection(db,'listings')

     //create a query
     const q=query(listingRef, 
        where('offer' ,'==',true),orderBy('timestamp','desc'),
     startAfter('lastFetchedListing'),
     limit(10)
     )
    //execute the query 
    const querySnap =await getDocs(q)
    const lastVisible =querySnap.docs[querySnap.docs.length-1]
    setLastFetchListing(lastVisible)
     const listings =[]

     querySnap.forEach((doc)=>{
         return listings.push({
             id:doc.id,
             data:doc.data()
         })
     })

     setListings((prevState)=>[...prevState, ...listings])
     setLoading(false)
    } catch (error) {
     toast.error('Could not fetch listings')
     
    } 
 }

  return   <div className='category'>
    <header >
        <p className='pageHeader'>
          offers
             </p>
    </header>
    {loading ? <Spinner/> : listings && listings.length >0 ?
    (<>
    <main>
        <ul className="categoryListings">
            {listings.map((listing)=>(
                < ListingItem 
                listing={listing.data}
                id={listing.id}
                key={listing.id}/>
            ))}
        </ul>
    </main>
    <br/>
    <br/>
    {lastFetchListing && (
        <p className="loadMore" onClick={onFetchMoreListings}>Load More</p>
    ) }

    </>):(
        <p> there are no current offers</p>
    )}
  </div>
  
}

export default Offers
