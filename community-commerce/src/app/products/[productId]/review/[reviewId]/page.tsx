import { notFound } from "next/navigation"

export default function ReviewDetails({ params }: { params: { productId: string, reviewId: string } }) {
   if(parseInt(params.reviewId)>1000){
notFound()
   }
    return (
        <div>
          review {params.reviewId} for product {params.productId}

        </div>
    )
}