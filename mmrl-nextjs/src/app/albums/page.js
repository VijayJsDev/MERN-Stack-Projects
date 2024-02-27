async function getData() {
    const res = await fetch('https://jsonplaceholder.typicode.com/albums')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }
   
  export default async function Page() {
    const data = await getData()
   
    return <main>{data.map(album => (
        <div key={album.id}>
            <li>User ID:{album.id}</li>
            <h1>Title:{album.title}</h1>
        </div>
    ))}</main>
  }