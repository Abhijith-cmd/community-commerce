export default function Docs({params}:{params : {slug:string}}){
  if(params.slug.length==2){
    return(
        <div>
            Viweing Docs for feature {params.slug[0]} and concept of {params.slug[1]}
        </div>
    )
  }else if(params.slug.length==1){
    return(
        <div>
            Viweing Docs for feature {params.slug[0]}
        </div>
    )
  }
  return <h1>Docs Home Page</h1>
}