import React ,{useState} from 'react'

const Uploadproducts = () => {
    const [images, setimages] = useState([])

    const handlefilechange =(e) =>{
        const file = e.target.files
        let previewurl = []
        const fileReaders = [];
       Array.from(file).map((el, index)=>{
        const fileReader = new FileReader();
        fileReaders.push(fileReader);

        fileReader.onload = (e)=>{
            previewurl[index] = e.target.result; 
            //   previewurl.push(e.target.result)
              console.log(previewurl);
              
            if (previewurl.length == file.length) {
              setimages(previewurl)  
            }
        }
        fileReader.readAsDataURL(el)
       })
       
    }
  return (
    <div>
    <h1>Upload Products</h1>
    <input onChange={handlefilechange} type="file" multiple />
    <button>SEND</button>
    </div>
  )
}

export default Uploadproducts